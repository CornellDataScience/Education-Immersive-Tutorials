def printhelp():
  print("""

  This script takes in a notebook and produces two versions: a release version
  and a solution version. If your file is "lec2.ipynb", this script will produce
  "lec2_Release.ipynb" and "lec2_Solution.ipynb"
  script inputs:
  1. hashSeed: the seed for this notebook's hash
  2. sourceFile: the source notebook
  3. releaseOutputFolder: the release notebook will be put into releaseOutputFolder.
  4. solutionOutputFolder: the release solution will be put into solutionOutputFolder.
  5. (optional) maintainMarkdown: see below

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
    * This means that if there's a leading "#", then that "#" will be omitted.
    If the character directly after the "#" is a whitespace, then that one 
    whitespace will also be omitted. Be sure to format your comments so that 
    this results in correct Python indentation. (Using ctrl+'/' to comment out 
    lines in Jupyter Notebook works well.) 

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
      The exception is markdown cells, with a special setting. See 5 below.
  5. control strings apply to markdown cells. But what if you want "## Solution"
     to render as a header saying Solution? That would be considered a control 
     tag and taken out. The solution is the --safe option. If you pass in "maintainMarkdown"
     as the last argument, then the script will only USE "##RELEASE", "##SOLUTION",
     and "##CLEAROUTPUT" as control tags in markdown cells (notice no space 
     after the pound signs). "##CLEAR OUTPUT" and "##CLEAR    OUTPUT" will still
     be considered control tags.
     Unfortunately, if you want to pass in maintainMarkdown, then you'll have
     to explicitly supply the solutionOutputFolder.
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
maintain_markdown = False
release_watermark=""
solution_watermark=""

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

  def export(self, fpath: str, watermark: str):
    final = {k:v for k,v in self.dat.items() if k != "cells"}
    final["cells"] = [self.dat["cells"][i] for i in range(self.num_orig_cells) if i in self.dat["cells"]]
    final["metadata"]["notebookId"] = watermark;
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
    if self.dat["cells"][index]["cell_type"] == "code":
      self.dat["cells"][index]["outputs"] = []

def uncomment(line: str):
  if re.match(r'\s*#', line, re.IGNORECASE) is None:
    return line
  poundIdx = line.index("#")
  if line[poundIdx + 1].isspace():
    return line[:poundIdx] + (line[poundIdx+2:] if poundIdx+2 < len(line) else "")
  return line[:poundIdx] + (line[poundIdx+1:] if poundIdx+1 < len(line) else "")
  # last_pound = -2
  # i = 0
  # while i < len(line):
  #   if not line[i].isspace():
  #     if line[i] == "#":
  #       if i == last_pound + 1:
  #         break
  #       else:
  #         last_pound = i
  #     else:
  #       break
  #   i += 1
  # if last_pound < 0:
  #   return line
  # if last_pound + 1 < len(line) and line[last_pound+1] == " ":
  #   return line[last_pound+2:]
  # return line[last_pound+1:]

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
  toRemove = []
  for ctrlStr in ctrlStrs:
    for i,line in enumerate(ret):
      found, ctrlStrStart, ctrlStrEnd = ctrlStr_range(line, ctrlStr)
      if found:
        if ctrlStrStart == 0 and ctrlStrEnd == len(line) - 1:
          toRemove.append(i)
        else:
          ret[i] = uncomment(line[:ctrlStrStart] + line[ctrlStrEnd:])
  return [line for i,line in enumerate(ret) if i not in toRemove]

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
    shouldUseAlternativePat = cellTypeAndSrc[0] == "markdown" and maintain_markdown
    sol_pat = SOLUTION_PAT_MARKDOWN if shouldUseAlternativePat else SOLUTION_PAT
    release_pat = RELEASE_PAT_MARKDOWN if shouldUseAlternativePat else RELEASE_PAT
    remove_output_pat = REMOVE_RELEASE_OUTPUT_PAT_MARKDOWN if shouldUseAlternativePat else REMOVE_RELEASE_OUTPUT_PAT
    cell = cellTypeAndSrc[1]
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
  nb.export(fout,release_watermark)
  
def makeSolution(nb: JupyterNotebook, fout: str):
  for cellId, cellTypeAndSrc in nb.cellSources().items():
    shouldUseAlternativePat = cellTypeAndSrc[0] == "markdown" and maintain_markdown
    sol_pat = SOLUTION_PAT_MARKDOWN if shouldUseAlternativePat else SOLUTION_PAT
    release_pat = RELEASE_PAT_MARKDOWN if shouldUseAlternativePat else RELEASE_PAT
    remove_output_pat = REMOVE_RELEASE_OUTPUT_PAT_MARKDOWN if shouldUseAlternativePat else REMOVE_RELEASE_OUTPUT_PAT
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
  nb.export(fout, solution_watermark)


import sys
if sys.argv[1].lower() == "help":
  printhelp()
  exit(0)

def makeWatermark(releaseOrSolution: str):
    pre = ''.join([chr((((ord(c)-48)*5 + 13) % 79) + 48) for c in list(sys.argv[1])])
    add = "a" if len(sys.argv[1]) == 0 else sys.argv[1][0]
    post = ''.join([chr((((ord(c)-48)*5 + 13 + ord(add)) % 79) + 48) for c in list(releaseOrSolution)])
    return pre + post

release_watermark = makeWatermark("release")
solution_watermark = makeWatermark("solution")

print("release watermark: " + release_watermark)
print("solution watermark: " + solution_watermark)

fin = sys.argv[2]
import ntpath
head, tail = ntpath.split(fin)
fin_name = tail or ntpath.basename(head)
fin_name = fin_name[:fin_name.index(".")]

releaseDirOut = sys.argv[3]
if releaseDirOut[-1] != "/":
  releaseDirOut += "/"
if len(sys.argv) > 4:
  solDirOut = sys.argv[4]
  if solDirOut[-1] != "/":
    solDirOut += "/"
else:
  solDirOut = releaseDirOut

maintain_markdown = len(sys.argv) > 5 and sys.argv[5].lower() == "maintainmarkdown"

nb = JupyterNotebook(fpath=fin)
if fin_name.lower().endswith("_source"):
  fin_name = fin_name[:-7]
makeRelease(nb.copy(),releaseDirOut+fin_name+"_Release.ipynb")
makeSolution(nb.copy(),solDirOut+fin_name+"_Solution.ipynb")
