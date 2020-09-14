## Motivation

![Fig. 1][Fig. 1]
**Fig. 1.** A circular dataset. Each point belongs to one of two classes: Red or Blue.

### Problem: Nonlinearly separable data
We've discussed the issue that data isn't linearly separable because of outliers. But outliers aren't the only way a dataset can be linearly inseparable. Consider **Fig. 1**. The data could easily be separated by drawing a circle that contains all the red dots. But that's not a line, so our SVM can't find that separation.

### Solution: Transformations
Luckily, in **Fig. 1**, add a new feature.


### Problem: Computation time
However, for transformations involving more features, the computation time starts to increase. Imagine a transformation that requires you to create 100 more features; you'd have to wait for your computer to create 100 features, and then you'd have to wait for an SVM to be trained on that massive dataset (SVM's are relatively fast, but they're not _that_ fast). With large datasets, the computer might even run out of memory before it can finish training the SVM.

In order to use complex transformations, we need some way to not use up 100 features-worth of memory. 

### Solution: The Kernel Trick!
For some special transformations, the SVM can change the way it does computations so that the full transformation is never directly computed. This is the Kernel Trick. In short, the Kernel Trick lets us use some extraordinarily complex transformations without crashing our computers.

For now, let's not even think about how the Kernel Trick works, and how to determine if a transformation can have the Kernel Trick applied to it. 
criteria for what transformations the SVM can d 
There're a couple common kernels

## Common Kernels
Here are a few popular kernels you might want to try with your SVM:

1. Polynomial

2. RBF (Gaussian Radial Basis Function)

3. Sigmoid




[Fig. 1]: {{ asset SVM kernel_radial2D_init.png }}

