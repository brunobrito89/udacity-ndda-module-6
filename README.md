# Udacity Data Analyst Nanodegree Project 6
## This repository contains the final project of Data Visualization Module.

## Summary
This analysis was created in order to help users understand which circumstances could have led the passengers to a higher survival rate.
The original dataset was broken into 7 grouped versions in order to create bar charts and scatter plots. These show the relation between gender, passenger class, age and survival.

## Design
### Titanic Data Set
#### Description:
*The sinking of the RMS Titanic is one of the most infamous shipwrecks in history.  On April 15, 1912, during her maiden voyage, the Titanic sank after colliding with an iceberg, killing 1502 out of 2224 passengers and crew. This sensational tragedy shocked the international community and led to better safety regulations for ships.*

*One of the reasons that the shipwreck led to such loss of life was that there were not enough lifeboats for the passengers and crew. Although there was some element of luck involved in surviving the sinking, some groups of people were more likely to survive than others, such as women, children, and the upper-class.*

*In this challenge, we ask you to complete the analysis of what sorts of people were likely to survive. In particular, we ask you to apply the tools of machine learning to predict which passengers survived the tragedy.*

The chosen design was to compare which features could have influenced the chances of surviving the crash. The following ones were considered:

* Gender
* Pclass
* Age

The summarized data files used for the charts were generated using a Python script (which is included in the *data_cleaning* folder).

The analysis first presents an overview on the total number of survivors.
* Conclusion: The majority of the passengers did not survive.

The second part of the analysis shows us how the passengers were distributed in Gender, Pclass and Age.
* Conclusion: The majority of the passengers were male, on the third class and between 20 to 40 years old.

The third part of the analyses used the three charts above but grouping the data between survivors and non-survivors.
* Conclusion: The passengers who had a better chance of survivors were: Women, people on the 1st and 2nd class and kids.

#### After the feedbacks:
After receiving feedbacks, a couple changes were made:
* 


## Feedback
### 1
> The charts are pretty self-explanatory. However, the blue/"pink" bubbles led me to always interpret as male/female instead of Yes/No (for survival).

### 2
> Although the charts are easy to understand, there should be some comments with the conclusions and findings for some charts.

### 3
> The charts are ok and the conclusions are easily made. But the design, all charts in a row could be improved. 


## Resources
* [dimple](http://dimplejs.org/examples_index.html)
* [Udacity Module 2 Final Project](https://github.com/brunobrito89/udacity-ndda-module-2)
