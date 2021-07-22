from textblob import TextBlob
import csv
oldFile = open('tweets.csv', encoding="utf-8")
newFile = open('sentiment.csv', mode="w", encoding="utf-8")
csv_read = csv.reader(oldFile)
csv_write = csv.writer(newFile, delimiter=',', lineterminator='\n')
for row in csv_read:
    row[2] = TextBlob(row[1]).sentiment.polarity
    csv_write.writerow(row)
oldFile.close()
newFile.close()