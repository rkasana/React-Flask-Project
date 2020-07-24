# Import necessary libraries
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.metrics import confusion_matrix
from sklearn.tree import DecisionTreeClassifier
from sklearn import tree
import pickle
from sklearn.datasets import load_iris


# Split the dataset into features and labels
X, y = load_iris(return_X_y=True)

print(pd.DataFrame(X).head())

# Split the dataset into training (80%) and test(20%)
X_train, X_test, y_train, y_test = train_test_split(X, y, train_size=0.7,random_state=1)

# Build the classifier and make prediction
classifier = DecisionTreeClassifier()
classifier = classifier.fit(X_train, y_train)
prediction = classifier.predict(X_test)

# Print the confusion matrix
print("Confusion Matrix:")
print(confusion_matrix(y_test, prediction))

# Plot the DecisionTree with the plot_tree
# tree.plot_tree(classifier)

# save the model to disk
filename = 'classifier'
outfile = open(filename, 'wb')
pickle.dump(classifier, outfile)
outfile.close()
