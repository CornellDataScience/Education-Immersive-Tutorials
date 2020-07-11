import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from "@material-ui/core/Typography";
import Paper from '@material-ui/core/Paper';
import ReactDOM from 'react-dom';
import webconfig from '@Main/ts/constants/webconfig';
import { Project } from '@Main/ts/constants/crossProjectInfo'
import MainBase from '@Main/ts/mainBase'
import node from '@Main/projects/networkAnalysis/assets/Node.png';
import edge from '@Main/projects/networkAnalysis/assets/Edge.png';
import directedge from '@Main/projects/networkAnalysis/assets/DirectEdge.png';
import cycle from '@Main/projects/networkAnalysis/assets/Cycle.png';
import dag from '@Main/projects/networkAnalysis/assets/DAG.png';
import closure from '@Main/projects/networkAnalysis/assets/Closure.png';
import centrality from '@Main/projects/networkAnalysis/assets/Centrality.png';
import embeddedness from '@Main/projects/networkAnalysis/assets/Embeddedness.png';
import style from '@Main/projects/networkAnalysis/styles/Tutorial.module.css'
import TextCard from '@Main/projects/networkAnalysis/ts/textcard';
import VisualCard from '@Main/projects/networkAnalysis/ts/visualcard';
class Main extends React.Component {

  render() {
    const textPosts = [
      {
        title: 'What is a Node?',
        code: 'import networkx as nx \n import matplotlib.pyplot as plt \n g = nx.Graph() \n g.add_node(1) \n nx.draw(g)',
        image: node,
        description: <Typography><b>Technical Description</b><br />A node (or vertex) is the most fundamental unit on which graphs are based. In graph theory, they may also be referred to as "point", "junction", or "0 - simplex". <br /><br /><b>Real-World Relevance</b><br />This single datapoint could be interpreted in different ways depending on the context. If you were to consider a network of the human race, each node would be a person. For the network of webpages on the world wide web, each node would be a webpage. A node could also represent a single train station in a somewhat complex railway network. It is important to note that while we typically consider a node to be the fundamental unit of graphs, each node itself could contain a lot of information. In a social network, where each node represents a person, each node is a user profile comprised of data about the user's gender, age, contact information, their preferences, and other information they have made public.</Typography>,
      },
      {
        title: 'Edges',
        code: 'g_directed = nx.DiGraph() \n g_directed.add_edge(1, 2) \n g_directed.add_edge(2, 3) \n nx.draw(g_directed, with_labels = True,)',
        image: directedge,
        description: <Typography><b>Technical Description</b><br />The links with which two nodes are connected to each other are called edges. In this case, for example, there are 3 nodes and 2 edges (one connects Node 1 and Node 2, and the other connects Node 2 and Node 3). The nodes that an edge connects are called <b>neighbors</b>. Note that Node 1 and Node 3 aren't neighbors with each other here. Broadly, we can have either <b>undirected</b> or <b>directed</b> graphs based on the context. In directed graphs (to the right), a node connects to another with a <b>directed edge</b>, indicating an asymmetric relationship.</Typography>,
      },

      {
        title: '',
        code: 'g.add_edge(1, 2) \n g.add_edge(2, 3) \n nx.draw(g, with_labels = True)',
        image: edge,
        description: <Typography>In the case of undirected graphs (to the right), an undirected edge implies a symmetric relationship between the two nodes it connects.<br /><br /><b>Real-World Relevance</b><br />An edge implies a relationship between the two entities, which are repsented by nodes. In a social network, for example, an edge could imply a connection between two people. The nuance of directed and undirected graphs gives us a convenient way to represent more complex information. For example, a directed graph would be more fitting if we were to represent a genealogy network - we can then direct edges from ancestors to their successors (since it is somewhat an asymmetric relationship). Even a social network, which you would typically represent as an undirected graph, could be represented as a directed graph if you were to consider who sent whom the friend/follow request first - this would add another interesting dimension to the problem.</Typography>,
      },
      {
        title: 'Paths, Cycles, Connectivity',
        code: 'nx.draw(g, with_labels = True)',
        image: edge,
        description: <Typography><b>Technical Description</b><br /><b>Path:</b> A path is a sequence of nodes where "each consecutive pair in the sequence is connected with an edge" (Easley and Kleinberg, 2010). Broadly, if a path does not repeat any nodes, it is called a <b>simple path</b>. If it doesn't repeat any nodes, it is a <b>non-simple path</b>. In graph theory, a path is a trail in which all vertices (and edges) are distinct. In our example, there is a clear path from 1 to 3, and from 3 to 1 (via 2).</Typography>,
      },
      {
        title: '',
        code: 'g_directed = nx.DiGraph() \n g_directed.add_edge(1, 2) \n g_directed.add_edge(2, 3) \n g_directed.add_edge(3, 1) \n nx.draw(g_directed, with_labels = True,)',
        image: cycle,
        description: <Typography><b>Cycle:</b> A cycle is a non-simple path with "at-least three edges, in which the first and last nodes are the same, but otherwise all nodes are distinct" (Easley and Kleinberg, 2010). A <b>cycle graph</b> is a graph of a cycle which has no repeated vertices and edges (a simple cycle). The given visualization is an example of a cycle graph.</Typography>,
      },
      {
        title: '',
        code: 'g_dag = nx.DiGraph() \n g_dag.add_edge(1, 2) \n g_dag.add_edge(2, 3) \n g_dag.add_edge(3, 4) \n nx.draw(g_dag, with_labels = True,)',
        image: dag,
        description: <Typography>A commonly-used concept is <b>Directed Acyclical Graph (DAG)</b>, which is what the name implies - a graph that is acyclical in nature (does not have the same first and last nodes) and has directed edges. The given visualization represents a simple DAG with four nodes (1, 2, 3, 4). <b>Connectivity:</b> A graph is said to be <b>connected</b> "if for every pair of nodes, there is a path between them" (Easley and Kleinberg, 2010). In other words, there is a way to get from each node to each other node (regardless of how simple or complex that route may be). <br /><br /><b>Real-World Relevance</b><br />Paths and connectivity could be understood together. If we wanted to see if two nodes are connected, we could check if there exists a path between them. Consider the case of a police chasing a criminal on the run - traditionally, they would not be connected with the criminal and their job is to find a path (the shortest, most efficient one) to the criminal. They would conduct an investigation, find who are closest to the criminal (the end node), and trace back connections to one they could directly inquire. As soon as they find a link with the criminal, they are then connected to the criminal in the sense of a network, and can pursue the path. In short, unless they are connected to the end node, they do not have a viable path to pursue. Directed acylical graphs are also easy to understand in context of your daily lives. For example, consider what you have done today - likely, you brushed your teeth after you woke up, after which you probably (hopefully) had breakfast. This can be represented as a DAG, since each subsequent event (or node) has a dependency on the previous one. You can only brush your teeth after you woke up, and so you would draw a directed edge from "waking up" to "brushing teeth".</Typography>,
      },
      {
        title: 'Distance of Six Degrees of Separation',
        code: 'nx.draw(g, with_labels = True)',
        image: edge,
        description: <Typography><b>Technical Description</b><br /><b>Distance:</b> The distance between any two nodes in a graph is the "length of the shortest path between them" (Easley and Kleinberg, 2010). In our example, there the distance from node 1 to node 3 is 2. Sometimes, however, graphs are more complex and it is harder to compute the distance - this is where <b>Breadth First Search</b> and <b>Depth First Search</b> are useful. <br /><br /> <b>Real-World Relevance</b><br />As the access to internet improves worldwide, the world is more connected than ever. Therefore, the idea of <b>"six degrees of separation"</b> is more relevant than ever. This idea states that all people are at-most six social connections away from each other. While the notion grew out of Stanley Milgram's work in the 1960s, <a href="https://hbr.org/2003/02/the-science-behind-six-degrees">a lot of work</a> has been done on the subject since.</Typography>,
      },
      {
        title: 'Triadic Closure',
        code: 'nx.draw(g, with_labels = True)',
        image: edge,
        description: <Typography><b>Technical Description</b><br /><b>Triadic Closure:</b> The Triadic Closure principle underlines the evolving nature of networks, and states the following: "If two people in a social network have a friend in common, then there is an increased likelihood that they will become friends themselves at some point in the future" (Easley and Kleinberg, 2010). In our example, the Triadic Closure Principle hypothesizes that if 2 is friends with both 1 and 3, there is an increased likelihood that 1 and 3 would also be friends. This is displayed in the second iteration (triangular-looking closed graph - hence the name "triadic closure") of the same group of nodes. "Triadic closure is intuitively very natural, and essentially everyone can find examples from their own experience. Moreover, experience suggests some of the basic reasons why it operates. One reason why B and C are more likely to become friends, when they have a common friend A, is simply based on the opportunity for B and C to meet: if A spends time with both B and C, then there is an increased chance that they will end up knowing each other and potentially becoming friends. A second, related reason is that in the process of forming a friendship, the fact that each of B and C is friends with A (provided they are mutually aware of this) gives them a basis for trusting each other that an arbitrary pair of unconnected people might lack." (Easley and Kleinberg, 2010).</Typography>,
      },
      {
        title: '',
        code: 'g.add_edge(1, 3) \n nx.draw(g, with_labels = True)',
        image: closure,
        description: <Typography><b>Real-World Relevance</b><br />"Triadic closure is intuitively very natural, and essentially everyone can find examples from their own experience. Moreover, experience suggests some of the basic reasons why it operates. One reason why B and C are more likely to become friends, when they have a common friend A, is simply based on the opportunity for B and C to meet: if A spends time with both B and C, then there is an increased chance that they will end up knowing each other and potentially becoming friends. A second, related reason is that in the process of forming a friendship, the fact that each of B and C is friends with A (provided they are mutually aware of this) gives them a basis for trusting each other that an arbitrary pair of unconnected people might lack." (Easley and Kleinberg, 2010).</Typography>,
      },
      {
        title: 'Measures of Centrality',
        code: 'g3 = nx.Graph() \n g3.add_node(1) \n g3.add_node(2) \n g3.add_node(3) \n g3.add_node(4) \n g3.add_node(5) \n g3.add_node(6) \n g3.add_node(7) \n g3.add_edge(1, 3) \n g3.add_edge(2, 3) \n g3.add_edge(3, 4) \n g3.add_edge(4, 5) \n g3.add_edge(5, 6) \n g3.add_edge(5, 7) \n g3.add_edge(7, 6) \n nx.draw(g3, with_labels = True)',
        image: centrality,
        description: <Typography><b>Technical Description</b><br /><b>Degree Centrality:</b> The degree centrality of a node refers to the number of edges that are attached to that node. This score can be standardized by dividing the score for each node by n - 1, where n is the total number of nodes in the network. Let's consider node 5 in the graph below. There are 3 edges connected to the node, and 7 nodes in the graph in total. Therefore, the standardized degree centrality for node 5 is 3/(7-1) = 0.5. <br /><br /><b>Betweenness Centrality:</b> The betweenness centrality of a node refers to the number of times that node lies on the shortest path between other nodes. This score can be standardized by dividing these scores by (n-1)(n-2)/2 (for undirected graphs) for each node, where n is the total number of nodes in the network. <br /><br /><b>Closeness Centrality:</b> The closeness centrality of a node depends on the sum of its shortest paths to all other nodes. In mathematical terms, it is the inverse of the sum of shortest paths of a node to all other nodes). It can be standardized by multiplying the result by n - 1, where n is the total number of nodes in the network. In our graph below, the standardized score for the closeness centrality of node 5 is 1/11 * (7 - 1) = 6/11.</Typography>,
      },
      {
        title: 'Embeddedness',
        code: 'g4 = nx.Graph() \n g4.add_node(2) \n g4.add_node(3) \n g4.add_node(4) \n g4.add_node(5) \n g4.add_node(6) \n g4.add_node(7) \n g4.add_edge(5, 3) \n g4.add_edge(2, 5) \n g4.add_edge(3, 7) \n g4.add_edge(4, 6) \n g4.add_edge(5, 7) \n g4.add_edge(5, 4) \n g4.add_edge(7, 2) \n nx.draw(g4, with_labels = True)',
        image: embeddedness,
        description: <Typography><b>Technical Description</b><br /><b>Embeddedness:</b> The embeddedness of an edge refers to the number of common neighbors that the two nodes at the end of the edge have. (Easley and Kleinberg, 2010). In our example, nodes 5 and 7 have both node 3 and node 2 in common. Therefore, the embeddedness of the A-B edge is 2. <br /><br /><b>Real-World Relevance</b><br />"A long line of research in sociology has argued that if two individuals are connected by an embedded edge, then this makes it easier for them to trust one another, and to have confidence in the integrity of the transactions (social, economic, or otherwise) that take place between them. Indeed, the presence of mutual friends puts the interactions between two people “on display” in a social sense, even when they are carried out in private; in the event of misbehavior by one of the two parties to the interaction, there is the potential for social sanctions and reputational consequences from their mutual friends...No similar kind of deterring threat exists for edges with zero embeddedness, since there is no one who knows both people involved in the interaction. " (Easley and Kleinberg, 2010).</Typography>,
      },
    ];

    return <MainBase NavbarItems={[]}>
      <div>
        <Container className={style.container} maxWidth="lg">

          <main>
            <Paper style={{
              height: 250,
              marginBottom: 40,
              position: 'relative',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              backgroundColor: 'black',
              backgroundImage: `url(${'https://miro.medium.com/max/4800/1*bgVMjq95tEVbBKYqL7AGxA.png'})`
            }}>
              {/* Increase the priority of the hero background image */}
              {<img style={{ display: 'none' }} src={'https://miro.medium.com/max/4800/1*bgVMjq95tEVbBKYqL7AGxA.png'} alt={'blah'} />}
              <div style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                right: 0,
                left: 0,
              }} />
              <Grid container>
                <Grid item md={6}>
                  <div style={{
                    position: 'relative',
                    padding: 30,
                  }}>
                    <Typography className={style.whitetext} component="h1" variant="h3" gutterBottom>
                      Network Analysis
                    </Typography>
                    <Typography className={style.whitetext} variant="h5" paragraph>
                      A Beginner's Guide To What It Is, How To Implement It, and Why It Matters
                  </Typography>
                  </div>
                </Grid>
              </Grid>
            </Paper>
            <Grid className={style.gridspacing} container spacing={4}>
              <div className={style.intro}>
                <Typography component="h2" variant="h5">
                  <b>Things to Know Before Reading</b>
                </Typography>
                <Typography>
                  <br />
                  Just to be transparent with what this tutorial aims to accomplish, this is by no means a comprehensive
                  tutorial over networks. This tutorial aims to introduce to beginners the concept of networks, some
                  important and common terminology, as well as some code to get you started with the proper directions
                  to explore the vast world of networks on your own. Each of the sections below have a text and code toggle
                  for you to examine the code used to make these simple network graphs. The Python library used here is
                  networkx (
                    <a href="https://networkx.github.io/documentation/stable/">documentation can be found here</a>
                    ). D3.js is also a popular language for making beautiful and dynamic network graphs (and
                    visualizations in general) but can be slightly trickier to learn. Enjoy the tutorial and stick
                    around at the end for further recommended resources!
                </Typography>
              </div>
            </Grid>
            {textPosts.map((post) => (
              <Grid className={style.gridspacing} container spacing={4}>
                <TextCard post={post} />
                <VisualCard post={post} />
              </Grid>
            ))}
            <Grid className={style.gridspacing} container spacing={4}>
              <div className={style.intro}>
                <Typography component="h2" variant="h5">
                  <b>Resources and Final Words</b>
                </Typography>
                <Typography>
                  Here are some useful resources to continue learning about network analysis: <br />
                  <li>
                    <a href="https://www.datacamp.com/community/tutorials/social-network-analysis-python">A more comprehensive
                    overview of the basics with a wider array of examples of code</a>
                  </li>
                  <li>
                    <a href="https://www.databentobox.com/2019/07/28/facebook-friend-graph/">A neat side project for visualizing
                    a network graph of your Facebook friends</a>
                  </li>
                  <li>
                    <a href="https://www.jessesadler.com/post/network-analysis-with-r/">Learn how to make network graphs in R</a>
                  </li>
                  <li>
                    <a href="https://livebook.manning.com/book/d3js-in-action-second-edition/chapter-7/48">Learn how to make network graphs in D3</a>
                  </li>
                  <br /> <b>References Used in This Tutorial:</b> <br />
                  <li>
                    Easley, David, and Jon Kleinberg. <a href="https://www.cs.cornell.edu/home/kleinber/networks-book/">Networks, crowds, and markets.</a> Vol. 8. Cambridge: Cambridge university press, 2010.
                  </li>
                  <li>
                    Weisstein, Eric W. "Graph Vertex." From MathWorld--A Wolfram Web Resource. <a href="https://mathworld.wolfram.com/GraphVertex.html">https://mathworld.wolfram.com/GraphVertex.html</a>
                  </li>
                  <li>
                    Bender, Edward A., and S. Gill Williamson. <a href="https://books.google.co.in/books?hl=en&lr=&id=vaXv_yhefG8C&oi=fnd&pg=PA1&dq=Lists,+Decisions+and+Graphs&ots=b_P5iXzrEc&sig=F8qCrg5rYiFuxrv_j8hwAn3sk0o&redir_esc=y#v=onepage&q=Lists%2C%20Decisions%20and%20Graphs&f=false"> Lists, Decisions and Graphs</a>. S. Gill Williamson, 2010.
                  </li>
                  <li>
                    Morse, Gardiner.<a href="https://hbr.org/2003/02/the-science-behind-six-degrees">The Science Behind Six Degrees</a>. Harvard Business Review, 2003.
                  </li>
                  <li>
                    Watabe, Motoki. <a href="https://www.sscnet.ucla.edu/soc/faculty/mcfarland/soc112/cent-ans.htm">https://www.sscnet.ucla.edu/soc/faculty/mcfarland/soc112/cent-ans.htm</a>. 1998.
                  </li>
                </Typography>
              </div>
            </Grid>
          </main>
        </Container>
      </div>
    </MainBase >
  }
}

ReactDOM.render(<Main />, document.getElementById("main-container"));



