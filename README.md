# HPCG Image Dataset Annotation Front End

This project is build for Purdue HPCG lab to assist the Rapid, Automated Post-Event Image Classification and Documentation. Check the paper http://hpcg.purdue.edu/papers/Yeum177AESE.pdf

This tool was mentioned in the paper above:
> For labeling the images that are to provide ground-truth training data, we design a web-based annotation
tool to allow multiple annotators can work together to complete the task within a short time. This annotation
modeled the tool that is used for a large-scale data [Yeum, 2016]. Users can rapidly annotate images using
only a keystroke and can make comments if needed. Three annotators with training in civil engineering took
part in the annotation of these images. Each labeled image is reviewed separately by at least two annotators.
In the beginning, the annotators are given enough time to learn class categories with sample images and
labeling. if there is a need for discussion of the class. 

This tool will help researchers to annotate the crop the image with the corresponding labels and generate json data to feed the machine learning model rapidly.


To start the application:

First, clone this repo and the backend repo for this project https://github.com/doudoujay/hpcg_img_dataset_backend

Then, start the backend and follow the instructions in back end readme.

After that start the frond end

```
npm start
```

Enjoy. The data will be saved as json files in backend.
