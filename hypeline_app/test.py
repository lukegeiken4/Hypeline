import indicoio
import sys
indicoio.config.api_key = 'ecad6731e6472b85c27e6eab6d35e003'


# single example
print indicoio.sentiment(str(sys.argv[1]))

# batch example
# print indicoio.sentiment([
#     "indico is so easy to use!",
#     "everything is awesome!"
# ])
