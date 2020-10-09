import * as React from 'react';
import * as d3 from 'd3';
// import webconfig from '@Main/ts/constants/webconfig';
// import { Project } from '@Main/ts/constants/crossProjectInfo'

export type KernelVisualProps = {
  // id?: string;
}

class KernelVisual extends React.Component<KernelVisualProps> {
  static idCount: number = 0;

  private readonly width: number = 500;
  private readonly height: number = 500;
  private readonly margin = { top: 10, right: 30, bottom: 30, left: 60 };

  private svgId: string;

  private data = [[1, 1], [2, 2], [3, 3]];

  constructor(props) {
    super(props);
    this.svgId = "kernel-visual-" + (KernelVisual.idCount++).toString();
    console.log(this.svgId)
  }

  componentDidMount() {
  }

  render() {
    return <></>;

  }



}





export default KernelVisual;