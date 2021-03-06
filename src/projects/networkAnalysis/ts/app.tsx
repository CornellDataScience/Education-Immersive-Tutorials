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
import homophily from '@Main/projects/networkAnalysis/assets/Homophily.png';
import homophily2 from '@Main/projects/networkAnalysis/assets/Homophily2.png';
import propinquity from '@Main/projects/networkAnalysis/assets/Propinquity.png';
import affiliation from '@Main/projects/networkAnalysis/assets/Affiliation.png';
import affiliation2 from '@Main/projects/networkAnalysis/assets/Affiliation2.png';
import balance from '@Main/projects/networkAnalysis/assets/Balance.png';
import balance2 from '@Main/projects/networkAnalysis/assets/Balance2.png';
import style from '@Main/projects/networkAnalysis/styles/Tutorial.module.css';
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
      {
        title: 'Homophily',
        code: 'g5 = nx.Graph() \n g5.add_node(1) \n g5.add_node(2) \n g5.add_node(3) \n g5.add_node(4) \n g5.add_node(5) \n g5.add_node(6) \n g5.add_node(7) \n g5.add_edge(1, 2) \n g5.add_edge(1, 3) \n g5.add_edge(3, 2) \n g5.add_edge(5, 6) \n g5.add_edge(5, 4) \n g5.add_edge(4, 6) \n g5.add_edge(2, 7) \n g5.add_edge(3, 7) \n g5.add_edge(4, 7) \n g5.add_edge(5, 7) \n colormap = [\'r\', \'r\', \'r\', \'g\', \'g\', \'g\', \'g\'] \n nx.draw(g5, node_color=colormap, with_labels = True)',
        image: homophily,
        description: <Typography><b>Technical Description</b><br /><b>Homophily</b> in the context of social networks refers to the idea that we tend to be similar to our friends in all manners of characteristics, ranging from age, race, affluence, etc (Easely and Kleinberg 2010).<br /> <br /> In this example, we  see that this is an easily identifiable case of homophily with the only connection between the two groups of nodes being node 7 (which connects to nodes 2 and 3). We can determine this more precisely if the fraction of heterogeneous edges is significantly <b>less</b> than the likelihood of a heterogeneous edge forming, then it's a case of homophily. Here, we have 2 groups (denoted as red and green) with their likelihood of appearing being 3/7 and 4/7 respectively, making the likelihood of a heterogeneous edge 2*(3/7)*(4/7) = 24/49. However, the fraction of heterogeneous edges is actually 2/10, far less than 24/49. Conversely, when the fraction of heterogeneous edges is significantly <b>larger</b> than the likelihood of heterogeneous edges forming, it would be <b>inverse homophily</b>.</Typography>
      },
      {
        title: '',
        code: 'nx.draw(g5, with_labels = True)',
        image: homophily2,
        description: <Typography>Revisiting Triadic Closure, we can likely say that node 6 has similar characteristics as nodes 4 and 5 due to homophily, and even though nodes 4 and 5 are not connected and hypothetically don't know that they are both mutually connected with node 6, they are still very likely to be similar and even form a connection. <br /><br /><b>Real-World Relevance</b><br /> You can find these relations everywhere in life, from social and political echo chambers, friend circles, parties, coworkers. Many of your friends or coworkers will probably share similar socio-political values as you or share the same income bracket or same age etc. This is by no means a hard rule but simply highlights the fact that the chance of people forming connections is most likely explained by the fact that they shared something in common to begin with. This is also a manifestation of the phrase: "Birds of a feather, flock together". A very interesting outcome of Homophily is with segregation. An American economist <b>Thomas Schelling</b> made some interesting revelations regarding this which can be found here: <a href="http://nifty.stanford.edu/2014/mccown-schelling-model-segregation/">Schelling's Model of Segregation</a></Typography>
      },
      {
        title: 'Propinquity',
        code: 'g6 = nx.Graph() \n g6.add_node(1) \n g6.add_node(2) \n g6.add_node(3) \n g6.add_node(4) \n g6.add_node(5) \n g6.add_node(6) \n g6.add_edge(1, 2) \n g6.add_edge(2, 3) \n g6.add_edge(3, 4) \n g6.add_edge(4, 5) \n g6.add_edge(5, 6) \n nx.draw(g6, node_color=range(6), cmap=plt.cm.Blues, with_labels = True)',
        image: propinquity,
        description: <Typography><b>Technical Description</b> <br />In a similar vein as Homophily, <b>Propinquity</b> is the idea that we tend to have shared characteristics or connections with those we are in geographical proximity with. The same principles discussed in Homophily can also apply to Propinquity. As you can see from the example, the edges represent physical location and nodes closer to each other share a more similar shade of blue than those farther away, illustrating the strength of connections due to geographic location. <br /><br /><b>Real-World Relevance</b><br />Think of the friends you first made in college, most likely people who shared the same dorm right? Or even closer, the same hallway? The friends you made in your childhood/teenage years all probably lived near you as you all went to the same school/church/activities. There have also been studies that show professors collaborating more with those who share the same space/building. These ideas are just a formation of common observations we see about our circles and networks in every day life. </Typography>
      },
      {
        title: 'Affiliation',
        code: 'from networkx.algorithms import bipartite \n g7 = nx.Graph() \n g7.add_nodes_from([\'Bob\', \'Joe\', \'Lisa\', \'Rosé\'], bipartite=0) \n g7.add_nodes_from([\'Jazz\', \'Suns\', \'Heat\'], bipartite=1) \n g7.add_edges_from([(\'Bob\', \'Heat\'), (\'Rosé\', \'Jazz\'), (\'Joe\', \'Suns\'), (\'Joe\', \'Heat\'), (\'Lisa\', \'Jazz\'), (\'Rosé\', \'Heat\')]) \n l, r = nx.bipartite.sets(g7) \n pos = {} \n pos.update((node, (1, index)) for index, node in enumerate(l)) \n pos.update((node, (2, index)) for index, node in enumerate(r)) \n nx.draw(g7, pos=pos, node_color=[\'royalblue\', \'royalblue\', \'royalblue\', \'royalblue\', \'r\', \'r\', \'r\'],node_size=[1000,1000,1000,1000,1500,1500,1500], with_labels=True)',
        image: affiliation,
        description: <Typography><b>Technical Description</b> <br />So far, we have been describing the characteristics of nodes as some external factor either not shown in graphs or represented as different colors in the last few examples. In <b>Affiliation Networks</b>, these characteristics, also known as <b>foci</b>, are nodes themselves in addition to the standard nodes. These network graphs can take several forms. <b>Bipartite graphs</b> separate the foci from the actors/people. In this example you can see which Basketball teams in the NBA that Lisa, Rosé, Joe, and Bob are a fan of respectively.</Typography>
      },
      {
        title: '',
        code: 'g8 = nx.Graph() \n g8.add_nodes_from([\'Jen\', \'Lisa\', \'Rosé\']) \n g8.add_edges_from([(\'Jen\', \'Lisa\'), (\'Jen\', \'Rosé\')]) \n g8.add_nodes_from([\'Jerry\', \'Raye\', \'CDS\']) \n g8.add_edges_from([(\'Jerry\', \'CDS\'), (\'Raye\', \'CDS\')]) \n g8.add_nodes_from([\'Kevin\', \'Kait\', \'Tennis\']) \n g8.add_edges_from([(\'Kevin\', \'Tennis\'), (\'Kevin\', \'Kait\')]) \n pos = {\'Jen\':(1,1), \'Lisa\':(0,0), \'Rosé\':(2,0),\'Jerry\': (3,1), \'Raye\': (5,1), \'CDS\': (4,0), \'Kait\': (6,1), \'Tennis\': (8,1), \'Kevin\': (7,0)} \n nx.draw(g8, pos = pos, node_color=[\'royalblue\',\'royalblue\',\'royalblue\',\'royalblue\',\'royalblue\',\'red\',\'royalblue\',\'royalblue\',\'red\'], node_size=[1500],with_labels=True)',
        image: affiliation2,
        description: <Typography><b>Social-Affiliation Networks</b> combine these foci and nodes into a standard network graph, displaying both relations from actors to other actors as well as actors to foci. Revisiting Triadic Closure once more, we can apply the concept onto social-affiliation networks as well. For example, traditional Triadic Closure expects that given a pair of friendships: Jen &amp; Lisa, Jen &amp; Rosé, we can expect that Lisa & Rosé will become friends. When the shared connection is a foci, it is called a <b>Focal Closure</b>. Such is the case where Jerry and Raye are both part of Cornell Data Science and thus are likely to form a connection at some point. When the shared connection between an actor/person and a foci is an actor/person, it's called a <b>Membership Closure</b>. If Kevin plays tennis and is friends with Kait, there is a reasonable chance that Kevin introduces Kait to playing Tennis.</Typography>
      },
      {
        title: 'Balance',
        code: 'g9 = nx.Graph() \n plt.figure(figsize=(10,6)) \n g9.add_nodes_from([\'Jennie\', \'Lisa\', \'Rosé\']) \n g9.add_nodes_from([\'Jerry\', \'Raye\', \'Tanmay\']) \n g9.add_nodes_from([\'Emily\', \'Dylan\', \'Chris\']) \n g9.add_nodes_from([\'Kevin\', \'Peter\', \'Ethan\']) \n pos = {\'Jennie\':(1,1), \'Lisa\':(0,0), \'Rosé\':(2,0),\'Jerry\': (3,1), \'Raye\': (5,1), \'Tanmay\': (4,0), \'Emily\': (6,0), \'Dylan\': (8,0), \'Chris\': (7,1), \'Kevin\': (9,1), \'Peter\': (10,0), \'Ethan\': (11,1)} \n nx.draw_networkx_edges(g9,pos, edgelist=[(\'Jerry\',\'Tanmay\'),(\'Raye\',\'Tanmay\'),(\'Emily\',\'Dylan\'), (\'Peter\',\'Ethan\'), (\'Peter\', \'Kevin\'), (\'Kevin\', \'Ethan\')], \n width=3,alpha=0.75,edge_color=\'r\') \n nx.draw_networkx_edges(g9,pos, edgelist=[(\'Jennie\',\'Lisa\'),(\'Rosé\',\'Lisa\'),(\'Jennie\',\'Rosé\'),(\'Jerry\',\'Raye\'),(\'Chris\',\'Dylan\'),(\'Emily\',\'Chris\')], \n width=3,alpha=0.75,edge_color=\'g\') \n nx.draw(g9, pos = pos, node_color=[\'royalblue\'], node_size=[2500],with_labels=True)',
        image: balance,
        description: <Typography><b>Technical Description</b><br />In the context of social networks, we can add further detail to edges i.e. positive (+) and negative (-) (denoted as green and red edges in our examples) relations between nodes, and due to pyschology and social dynamics, certain orientations of these relations are more plausible than others (<b>stable/balanced</b> relationships). In life, if an <b>unstable/unbalanced</b> relationship exists, social forces due to stress or psychological dissonance will try to correct this. We can see in these examples that the only balanced relationships occur when all 3 people are friends or 2 people are friends and mutual enemies of a third. In the event that a person is mutual friends with two enemies then they will try and reconcile this relationship as it incurs stress upon that person (unstable). Similarly, if all 3 people are enemies then the saying "the enemy of my enemy is my friend" may occur and two individuals will become friends to avoid the "Mexican Standoff" scenario (again unstable).</Typography>
      },
      {
        title: '',
        code: 'g10 = nx.Graph() \n plt.figure(figsize=(6,5)) \n g10.add_nodes_from([\'Jennie\', \'Lisa\', \'Rosé\', \'Jisoo\']) \n pos = {\'Jennie\':(1,2), \'Lisa\':(0,0), \'Rosé\':(1,1),\'Jisoo\': (2,0)} \n nx.draw_networkx_edges(g10,pos, edgelist=[(\'Jennie\', \'Lisa\'), (\'Jennie\', \'Jisoo\'), (\'Jisoo\', \'Rosé\'), (\'Lisa\', \'Rosé\')], \n width=3,alpha=0.75,edge_color=\'r\') \n nx.draw_networkx_edges(g10,pos, edgelist=[(\'Jennie\', \'Rosé\'), (\'Jisoo\', \'Lisa\')], \n width=3,alpha=0.75,edge_color=\'g\') \n nx.draw(g10, pos = pos, node_color=[\'royalblue\'], node_size=[1500],with_labels=True)',
        image: balance2,
        description: <Typography>From these examples we can define a formal property of a <b>structurally balanced</b> graph: "For every set of three nodes, if we consider the three edges connecting them, either all three of these edges are labeled +, or else exactly one of them is labeled +" (Easely and Kleinberg 2010). Using this, we can properly identify the example to the right as balanced.<br /><br /><b>Real-World Relevance</b><br />The implications of balancing social networks is something we deal with on a daily basis, since as social creatures, we try to maintain balance as much as possible and minimize any sources of instability within our friendships. This can also be applied to relations amongst public (and potentially political) figures and foreign relations between countries.</Typography>
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



