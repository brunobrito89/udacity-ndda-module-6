
# coding: utf-8
import pandas as pd
       
"""Numeric Features: Age, Fare
    Categorial Features: 
       - Ordinal Features: Pclass, SibSp, Parch
       - Nominal Features: Sex, Embarked """

titanic_df = pd.read_csv("../input/titanic-data.csv", index_col="PassengerId")
titanic_df.head()

# Checking if there's any null values in the dataset.
titanic_df.isnull().sum()


#Changing Survived Categorial class from Integers to Strings
titanic_df['Survived'] = titanic_df['Survived'].map({0: 'No', 1: 'Yes'})
titanic_df.head()


# Creating Age Ranges
bins = [0, 10, 20, 30, 40, 50, 60, 70, 80]
group_labels = ["0 to 10", "11 to 20", "21 to 30", "31 to 40", "41 to 50", \
                "51 to 60", "61 to 70", "71 to 80"]
titanic_df['AgeBins'] = pd.cut(titanic_df['Age'], bins, labels=group_labels)
titanic_df.head()


# Starting to group by features of interest
# Survived
survived_df = titanic_df.groupby(["Survived"]).size().reset_index() \
    .set_index("Survived").rename(columns={0: "Number of Occurrences"})
survived_df.to_csv("../output/groupby-survived.csv")
survived_df.head()

# Gender
gender_df = titanic_df.groupby(["Sex"]).size().reset_index() \
    .set_index("Sex").rename(columns={0: "Number of Occurrences"})
gender_df.to_csv("../output/groupby-gender.csv")
gender_df.head()

# Pclass
pclass_df = titanic_df.groupby(["Pclass"]).size().reset_index() \
    .set_index("Pclass").rename(columns={0: "Number of Occurrences"})
pclass_df.to_csv("../output/groupby-pclass.csv")
pclass_df.head()

# Age
age_df = titanic_df.groupby(["AgeBins"]).size().reset_index() \
    .set_index("AgeBins").rename(columns={0: "Number of Occurrences"})
age_df.to_csv("../output/groupby-age.csv")
age_df.head()

# Survived X Gender
survived_gender_df = titanic_df.groupby(["Survived", "Sex"]).size() \
    .reset_index().set_index("Sex").sort_index(axis=0).rename(columns={0: "Number of Occurrences"})
survived_gender_df.to_csv("../output/groupby-survived-gender.csv")
survived_gender_df.head()

# Survived X Pclass
survived_pclass_df = titanic_df.groupby(["Survived", "Pclass"]).size() \
    .reset_index().set_index("Pclass").sort_index(axis=0).rename(columns={0: "Number of Occurrences"})
survived_pclass_df.to_csv("../output/groupby-survived-pclass.csv")
survived_pclass_df.head()

# Survived X Age
survived_age_df = titanic_df.groupby(["Survived", "AgeBins"]).size() \
    .reset_index().set_index("AgeBins").sort_index(axis=0).rename(columns={0: "Number of Occurrences"})
survived_age_df.to_csv("../output/groupby-survived-age.csv")
survived_age_df.head(100)

