import pandas as pd
import matplotlib.pyplot as plt

# dict_cities = {"Cities": ["Pavlodar", "Nur-Sultan"], "Population": [335000, 1000000]}
# df = pd.DataFrame(dict_cities)
#
# df.to_excel('./pandas-2/cities.xlsx')
# print(df)

# cities = [["Pavlodar", "Nur-Sultan"], [335000, 1000000]]
# df = pd.DataFrame(cities).T
#
# print(df)

df = pd.read_csv("./pandas-2/DATA.csv")
# last15 = df.tail(15)
# print(last15)

# info = df.info()
# print(info)

# describe = df.describe(include="all")
# print(describe)

# shape = df.shape
# print(shape)

# print(df[(df["sex"] == "Both") & (df["cause"] == "Colon and rectum cancer") & (df["year"] == 2018)])

df.drop(["measure", "age", "upper", "lower"], axis=1, inplace=True)
df["val_round"] = df["val"].round(decimals=1)
df.rename(columns={"val": "value"}, inplace=True)

# df_pivot = df.pivot_table(values="value", index="location", columns="cause", aggfunc="mean", margins=False, dropna=True, fill_value=None)
# print(df_pivot.loc["Kazakhstan", "Alcohol use disorders"])

# df[(df["location"] == "Kazakhstan") & (df["cause"] == "Alcohol use disorders")
#    & (df["sex"] == "Both")].pivot_table(values="value", index="year", columns="sex",
#                                         aggfunc="mean", margins=False, dropna=True, fill_value=None).plot(kind="line")
#
# plt.title("Alcohol use disorders")
# plt.ylabel("Deaths per 100 000 citizens")

df[(df["location"] == "Kazakhstan")
   & (df["sex"].isin(["Male", "Female"]))].pivot_table(values="value", index="cause", columns="sex",
                                        aggfunc="mean", margins=False, dropna=True, fill_value=None).plot(kind="bar")

plt.title("Alcohol use disorders")
plt.ylabel("Deaths per 100 000 citizens")

plt.show()