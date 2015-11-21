import indicoio
import sys
indicoio.config.api_key = 'ecad6731e6472b85c27e6eab6d35e003'


# single example
dataList = sys.argv

del dataList[0]
print indicoio.sentiment(dataList)

