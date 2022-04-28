import json
import sys

import pandas as pd

location = None
sex = None
year = None
asc = None

for line in sys.stdin:
    data = json.loads(line)
    location = data.get("location")
    sex = data.get("sex")
    year = int(data.get("year"))
    asc = data.get("asc")

df = pd.DataFrame(pd.read_csv("./data/DATA.csv", sep=",", header=0))
df.drop(["measure", "metric", "age", "upper", "lower"], axis=1, inplace=True)

df_temp = df[(df["location"] == location) & (df["year"] == year) & (df["sex"] == sex)]

if asc == "true":
    df_temp = df_temp.nlargest(10, "val")
else:
    df_temp = df_temp.nsmallest(10, "val")

print(df_temp.to_json(orient="records"))