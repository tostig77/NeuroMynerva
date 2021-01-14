**[Get Started](#get-started)** |
**[Installation](#installation)** |
**[Develop](#develop-neuromynerva)** |
**[Getting help](#getting-help)** 

# NeuroMynerva _v2_ - [FlyBrainLab](http://fbl.fruitflybrain.org/)'s JupyterLab Extension
NeuroMynerva V2 is currently in _alpha_, most main user-facing features have been implemented but we expect bug fixes and additional features to be incorporated in the near future. If you want to report a bug, please see [Getting Help](#getting-help). To follow the latest developments on this project, follow the Fruit Fly Brain Observatory(FFBO) [Twitter](https://twitter.com/flybrainobs) where we post weekly updates.

<center><img src="img/neuromynerva_ui.png" width="1080"/></center>

## Get Started
NeuroMynerva V2 is hosted on [NPM](https://www.npmjs.com/package/@flybrainlab/neuromynerva) 
Please follow installation instruction detailed in [Installation](#installation) section.

### Using NeuroMynerva and FlyBrainLab
The best way to get started with NeuroMynerva is to look at the instructions on the [FlyBrainLab's page](https://github.com/FlyBrainLab/FlyBrainLab) and the [Wiki](https://github.com/FlyBrainLab/FlyBrainLab/wiki) therein.

For developers interested in the technical aspects of the NeuroMynerva platform, you can refer to the [NeuroMynerva Wiki](https://github.com/FlyBrainLab/NeuroMynerva/wiki).

### Key Components
NeuroMynerva front-end currently includes 4 key components:
1. `Neu3D-Widget`: A neuron/synapse morphology visualization toolkit that supports 3D rendering of neuron skeletons and meshes.
2. `Info-Widget`: A side panel widget that shows detailed neuron information (metadata, pre-/post- synaptic partners, etc.). Content updated by clicking on individual neurons in `Neu3D-Widget`.
3. `NeuGFX-Widget`: A circuit visualization widget.
4. `Master-Widget`: A side panel widget that keeps track of all currently running NeuroMynerva widgets.

## Installation
### Prerequisites
NeuroMynerva has the following requirements:

- Python Version 3.6+
- JupyterLab: Developed on `JupyterLab 2.1.5`, Tested on `JupyterLab 2.2.9` (Nov. 2nd 2020)
- Packages: 
    * [Neuroballad](https://github.com/FlyBrainLab/Neuroballad.git) and packages required therein,
    * [FBLClient](https://github.com/FlyBrainLab/FBLClient.git) and packages required therein.

### Installation of Full FlyBrainLab Eco-System 
Up-to-date installation instructions for the whole FlyBrainLab ecosystem are available at https://github.com/FlyBrainLab/FlyBrainLab#readme.

### Installation of NeuroMynerva
You can either install NeuroMynerva via command line as 
```
jupyter labextension install @flybrainlab/neuromynerva
```

or via JupyterLab's extension panel within a runnig JupyterLab instance:
<center><img src="img/neuromynerva_installation_menu.png" width="580"/></center>

### Upgrade NeuroMynerva
```
jupyter labextension update @flybrainlab/neuromynerva
```

### Develop NeuroMynerva
We use [Anaconda](https://www.anaconda.com/) to manage development environment, you are encouraged to first create a Conda environment 

```bash
# create conda environment and install python dependencies
conda create -n fbl python=3.7 nodejs scipy pandas cookiecutter git yarn -c conda-forge -y
conda activate fbl
```

You can then use the following script to setup the development environment. 
```bash
# create conda environment and install python dependencies
pip install jupyter jupyterlab==2.2.8
pip install txaio twisted autobahn crochet service_identity autobahn-sync matplotlib h5py seaborn fastcluster networkx msgpack

# if on Windows, execute the following:
# pip install pypiwin32

# install inhouse packages and NeuroMynerva
git clone https://github.com/FlyBrainLab/NeuroMynerva.git
git clone https://github.com/FlyBrainLab/Neuroballad.git
git clone https://github.com/FlyBrainLab/FBLClient.git
cd ./Neuroballad
python setup.py develop
cd ../FBLClient
python setup.py develop
cd ../NeuroMynerva
jlpm
jlpm run build

# if in development mode
jupyter labextension link .
jupyter lab --watch
```

## Changes from V1
V2 of NeuroMynerva is a complete overhaul of V1, which was developed when JupyterLab was still in beta phase (v0.33). A few key differences are highlighted below:

1. All widgets (Neu3D, NeuGFX) under V2 can be instantiated and used independently, without needing to spawn an entire FBL Workspace.
2. All widgets in V2 are now able to communication with the FFBO server backend independently, whereas in V1 all communications to/from the sever backend are routed through the `Master-Extension`.
3. `Master-Extension` in V1 has been removed since no single point of communication with the server backend is required in V2. Instead, a new `Master-Widget` has been introduced as a side panel that shows all currently running NeuroMynerva widgets.
4. `Neu3D-Widget` under V2 can be used for data visualization with or without python kernel support. It now supports visualization of local neuron skeleton or neuropil mesh files (in `swc` or `obj` formats).

### Work in Progress Changes
Work in progress changes are tracked in the [V2 Milestone](https://github.com/FlyBrainLab/NeuroMynerva/milestone/1), some key features being worked on are as follows:

1. Kernel entry point: users currently can instantiated widgets by interacting with the JupyterLab Launch Menu or the Command Palette, which executes code in the front-end to spawn widgets. We are working on supporting spawning and control widgets from within the kernel (in Notebook or Console).
2. Improved CAD capabilities with NeuGFX. NeuGFX is currently designed around interactions with a collection of hand-made circuit diagrams. More general support for circuit manipulation and visualization is being worked on.
3. Dark Mode


## Getting Help
The best way to get help right now is to [submit an issue](https://github.com/FlyBrainLab/NeuroMynerva/issues).
You can also join our [Gitter](https://gitter.im/FlyBrainLab/community) and ask us questions there.
