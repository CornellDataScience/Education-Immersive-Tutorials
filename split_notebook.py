def printhelp():
  print("""

  This script takes in a notebook and produces two versions: a release version
  and a solution version. If your file is "lec2.ipynb", this script will produce
  "lec2_Release.ipynb" and "lec2_Solution.ipynb"
  script inputs:
  1. sourceFile: the source notebook
  2. releaseOutputFolder: the release notebook will be put into releaseOutputFolder.
  3. solutionOutputFolder: the release solution will be put into solutionOutputFolder.
    If not specified, this will go into solutionOutputFolder.

  There are three control strings, which define what goes into release vs solution.
  They have the format "##CTRLSTR" where CTRLSTR is "RELEASE", "SOLUTION", or 
  "CLEAR OUTPUT". Note the double pound -- these are like special Python comments.
  All control strings themselves are omitted from release and solution.

  RELEASE / SOLUTION:
    Lines with "##SOLUTION" are omitted from the release.
    Lines with "##RELEASE" are omitted from the solutions.
    If the first line has nothing except "##SOLUTION", then that whole cell
    is omitted from the release (and analogously for "##RELEASE").
    In solutions, commented out lines with "##SOLUTION" will be uncommented.
    * This means that if there's a leading "#", then that "#" and the whitespace before it
    will be omitted. If there is a space after the "#", then that one space
    will also be omitted. Be sure to format your comments so that this results in correct 
    Python indentation. (Using ctrl+'/' to comment out lines works well.) 

  CLEAR OUTPUT: 
    Omits cell output from **release**. Does not omit output from solution.
    Only applies if "##CLEAR OUTPUT" is the last line in the cell.

  Very Specific Specifics:
  1. don't put two control strings in the same line
  2. blank lines don't matter, i.e. the "first" line in a cell is 
     the first line with visible text in it, then it is considered the "first" line
  3. capitalization in control strings doesn't matter
  4. most whitespace in control strings doesn't matter. In most cases, following are equivalent:
      - "##CLEAR OUTPUT"
      - "##CLEAROUTPUT"
      - "## CLEAROUTPUT"
      - "     ##     CLEAR    OUTPUT    "
      The exception is markdown cells. See 5 below.
  5. control strings apply to markdown cells, with a catch: there can't be any 
     whitespace between "##" and "CLEAR OUTPUT". So, only "##CLEAROUTPUT",
     "##CLEAR   OUTPUT", etc. are acceptable.
     This is because markdown treats the pattern "## anytext", with the whitespace,
     specially.
  6. You can use double pounds to make a comment in a control string line. For example,
                  RAW                                RELEASE
      "# this will become code ## RELEASE" -> "this will become code"
      "## this will stay a comment ## RELEASE" -> "# this will stay a comment"
  7. In a line, everything after the control string is omitted.
  """)



RELEASE_PAT = r'##\s*RELEASE'
RELEASE_PAT_MARKDOWN = r'##RELEASE'
SOLUTION_PAT = r'##\s*SOLUTION'
SOLUTION_PAT_MARKDOWN = r'##SOLUTION'
REMOVE_RELEASE_OUTPUT_PAT = r'##\s*CLEAR\s*OUTPUT'
REMOVE_RELEASE_OUTPUT_PAT_MARKDOWN = r'##CLEAR\s*OUTPUT'

import json
from copy import deepcopy
from typing import * 
import re
class JupyterNotebook:

  def __init__(self, **kwargs):
    if "fpath" in kwargs:
      with open(kwargs["fpath"],'r') as fp:
        self.dat = json.load(fp)
      self.dat["cells"] = {i: cell for i,cell in enumerate(self.dat["cells"])}
      self.num_orig_cells = len(self.dat["cells"])
    elif "dct" in kwargs and "num_orig_cells" in kwargs:
      self.dat = kwargs["dct"]
      self.num_orig_cells = kwargs["num_orig_cells"]
    else:
      raise Exception("bad constructor args")

  def copy(self):
    return JupyterNotebook(dct=deepcopy(self.dat),num_orig_cells=self.num_orig_cells)

  def export(self, fpath: str):
    final = {k:v for k,v in self.dat.items() if k != "cells"}
    final["cells"] = [self.dat["cells"][i] for i in range(self.num_orig_cells) if i in self.dat["cells"]]
    with open(fpath, "w+") as fp:
      json.dump(final, fp, indent="    ")

  def cellSources(self):
    def src(id):
      return self.dat["cells"][id]["source"]
    def celltype(id):
      return self.dat["cells"][id]["cell_type"]
    return {i: (celltype(i), src(i)) for i in range(self.num_orig_cells) if i in self.dat["cells"]}

  def setSource(self, index: int, newSource: str):
    self.dat["cells"][index]["source"] = newSource
  
  def remove(self, index: int):
    del self.dat["cells"][index]
  
  def removeOutput(self, index: int):
    self.dat["cells"][index]["outputs"] = []

def uncomment(line: str):
  if re.match(r'\s*#', line, re.IGNORECASE) is None:
    return line
  last_pound = -2
  i = 0
  while i < len(line):
    if not line[i].isspace():
      if line[i] == "#":
        if i == last_pound + 1:
          break
        else:
          last_pound = i
      else:
        break
    i += 1
  if last_pound < 0:
    return line
  if last_pound + 1 < len(line) and line[last_pound+1] == " ":
    return line[last_pound+2:]
  return line[last_pound+1:]

def ctrlStr_applies_to_whole_cell(cell: List[str], ctrlStr: str):
  if len(cell) == 0:
    return False
  line_idx = 0
  while cell[line_idx].isspace():
    line_idx += 1
    if line_idx > len(cell):
      return False
  return re.match(r'\s*' + ctrlStr + r'\s*', cell[0], re.IGNORECASE) is not None

# Returns tuple (wasFound, start, end)
def ctrlStr_range(line: str, ctrlStr: str):
  m = re.search(ctrlStr, line, re.IGNORECASE)
  if m is None:
    return False, -1, -1
  end = len(line) if line[-1] != "\n" else len(line) - 1
  return True, m.start(), end

def remove_lines_with_ctrlStr(cell: List[str], ctrlStr: str):
  return [line for line in cell if not ctrlStr_range(line, ctrlStr)[0]]

# uncomments any lines with ctrlStrs
def strip_ctrlStrs_and_uncomment(cell: List[str], ctrlStrs: Dict[str,bool]):
  ret = [line for line in cell]
  for ctrlStr in ctrlStrs:
    for i,line in enumerate(ret):
      found, ctrlStrStart, ctrlStrEnd = ctrlStr_range(line, ctrlStr)
      if found:
        ret[i] = uncomment(line[:ctrlStrStart] + line[ctrlStrEnd:])
  return ret

def delete_output_ctrlStr_inplace_and_ret_whether_it_existed(cell: List[str], ctrlStr: str):
  ## also removes applied ctrlStr if it exists!
  line_idx = len(cell) - 1
  while line_idx >= 0 and len(cell):
    if len(cell[line_idx]) == 0 or cell[line_idx].isspace():
      line_idx -= 1
    else:
      if re.search(r'\s*' + ctrlStr + r'\s*', cell[line_idx], re.IGNORECASE) is not None:
        cell.pop(line_idx)
        return True
      else:
        return False
  return False

def makeRelease(nb: JupyterNotebook, fout: str):
  for cellId, cellTypeAndSrc in nb.cellSources().items():
    sol_pat = SOLUTION_PAT_MARKDOWN if cellTypeAndSrc[0] == "markdown" else SOLUTION_PAT
    release_pat = RELEASE_PAT_MARKDOWN if cellTypeAndSrc[0] == "markdown" else RELEASE_PAT
    remove_output_pat = REMOVE_RELEASE_OUTPUT_PAT_MARKDOWN if cellTypeAndSrc[0] == "markdown" else REMOVE_RELEASE_OUTPUT_PAT
    cell = cellTypeAndSrc[0]
    if ctrlStr_applies_to_whole_cell(cell, sol_pat):
      nb.remove(cellId)
    else:
      cell = remove_lines_with_ctrlStr(cell, sol_pat)
      if delete_output_ctrlStr_inplace_and_ret_whether_it_existed(cell,remove_output_pat):
        nb.removeOutput(cellId)
      cell = strip_ctrlStrs_and_uncomment(cell, {
        sol_pat: False,
        release_pat: True,
        remove_output_pat: False
      })
      nb.setSource(cellId,cell)
  nb.export(fout)
  
def makeSolution(nb: JupyterNotebook, fout: str):
  for cellId, cellTypeAndSrc in nb.cellSources().items():
    sol_pat = SOLUTION_PAT_MARKDOWN if cellTypeAndSrc[0] == "markdown" else SOLUTION_PAT
    release_pat = RELEASE_PAT_MARKDOWN if cellTypeAndSrc[0] == "markdown" else RELEASE_PAT
    remove_output_pat = REMOVE_RELEASE_OUTPUT_PAT_MARKDOWN if cellTypeAndSrc[0] == "markdown" else REMOVE_RELEASE_OUTPUT_PAT
    cell = cellTypeAndSrc[1]
    if ctrlStr_applies_to_whole_cell(cell, release_pat):
      nb.remove(cellId)
    else:
      cell = remove_lines_with_ctrlStr(cell, release_pat)
      cell = strip_ctrlStrs_and_uncomment(cell, {
        sol_pat: True,
        release_pat: False,
        remove_output_pat: False
      })
      nb.setSource(cellId,cell)
  nb.export(fout)


import sys
if sys.argv[1].lower() == "help":
  printhelp()
  exit(0)

fin = sys.argv[1]
import ntpath
head, tail = ntpath.split(fin)
fin_name = tail or ntpath.basename(head)
fin_name = fin_name[:fin_name.index(".")]

releaseDirOut = sys.argv[2]
if releaseDirOut[-1] != "/":
  releaseDirOut += "/"
if len(sys.argv) >= 3:
  solDirOut = sys.argv[3]
  if solDirOut[-1] != "/":
    solDirOut += "/"
else:
  solDirOut = releaseDirOut

nb = JupyterNotebook(fpath=fin)
makeRelease(nb.copy(),releaseDirOut+fin_name+"_Release.ipynb")
makeSolution(nb.copy(),solDirOut+fin_name+"_Solution.ipynb")