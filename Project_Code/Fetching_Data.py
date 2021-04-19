#!/usr/bin/env python
# coding: utf-8

# In[12]:


from googleplaces import GooglePlaces, types, lang
import requests as r
import json
import pandas as pd


# In[13]:


data = pd.read_csv("File location for crime dataset with loc,lat,lng and Arrest Count")


# In[14]:


data.columns


# In[19]:


import requests as r,pandas as pd

def f(x,radius,typ):

    z = r.get("""https://maps.googleapis.com/maps/api/place/nearbysearch/json?location={0},{1}&radius={2}&type={3}&key=YOUR_API_KEY""".format(x['lat'],x['lng'],radius,typ))
    return len(z.json()['results'])

# Features taken into consideration
# 'supermarket','park','gym','hospital','restaurant','school','bus_station','atm'

for i in ['supermarket','park','gym','hospital','restaurant','school','bus_station','atm']:
    data[i]  = data.apply(lambda x : f(x,1609,i),axis = 1)
 


# In[ ]:


# Saving the CSV File


# In[18]:


data.to_csv('New File Location', index = False)

