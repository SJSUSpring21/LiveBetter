#!/usr/bin/env python
# coding: utf-8

# In[1]:


import pandas as pd


# In[2]:


data1 = pd.read_csv("Location for data1")


# In[3]:


data2 = pd.read_csv("Location for data2")


# In[4]:


data1.head(2)


# In[5]:


data2.head(2)


# In[6]:


# Concatenating Data Frames
concatenated_dataframes = pd.concat([data1.reset_index(drop=True),data2.reset_index(drop=True)],axis=1,ignore_index=True)


# In[7]:


concatenated_dataframes.head(2)


# In[8]:


# Concatenating Data Frame Column Names
concatenated_dataframes_columns = [list(data1.columns),list(data2.columns)]
flatten = lambda nested_lists: [item for sublist in nested_lists for item in sublist]

concatenated_dataframes.columns = flatten(concatenated_dataframes_columns)


# In[9]:


concatenated_dataframes


# In[10]:


# Saving to csv file
concatenated_dataframes.to_csv('New File Location', index = False)

