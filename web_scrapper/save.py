import csv

def save_to_file(jobs):
    #encoding='utf-8' !!! 줄바꿈이 들어가있는경우는 newline=""추가.
    file = open("jobs.csv", mode="w", encoding="utf-8", newline="")
    writer = csv.writer(file)
    writer.writerow(["title", "company", "location", "link"])
    for job in jobs:
        writer.writerow(list(job.values()))
    file.close()
    return