import requests
from bs4 import BeautifulSoup

#1. 주소가져오기 2. 리퀘스트 만들기 3. job추출하
URL = "https://stackoverflow.com/jobs?q=python"

def get_last_page():
    result = requests.get(URL)
    soup = BeautifulSoup(result.text, "html.parser")
    pagination = soup.find("div", {"class":"s-pagination"})
    # print(pagination)
    # last_page = pagination.find_all('a')[-2].text
    last_page = pagination.find_all('a')[-2].get_text(strip=True)
    return int(last_page)
    # for _ in pages:
    #     print(_.text)
    

def extract_job(html):
    # title = html.find("div", {"class":"-title"}).find("h2").find("a")["title"]
    title = html.find("div", {"class":"flex--item fl1"}).find("h2").find("a")["title"]
    # company_row = html.find("div", )
    # company_row = html.find("h3", {"class":"fc-black-700 fs-body1 mb4"}).find_all("span")
    company, location = html.find("h3", {"class":"fc-black-700 fs-body1 mb4"}).find_all("span", recursive=False)
    company, location = company.get_text(strip=True),location.get_text(strip=True)
    job_id = html["data-jobid"]
    
    return {'title':title, 'company':company, 'location':location, 
            'link':f"https://stackoverflow.com/jobs/{job_id}"}

def extract_jobs(last_page):
    jobs = []
    # for page in range(1):
    for page in range(last_page):
        print(f"Scrapping SO Page: {page}")
        result = requests.get(f"{URL}&pg={page+1}")
        # print(result.status_code) 
        soup = BeautifulSoup(result.text, "html.parser")
        results = soup.find_all("div",{"class":"-job"})
        # print(results[-1])
        for result in results:
            job = extract_job(result)
            # print(job)
            jobs.append(job)
    return jobs

def get_so_jobs():
    last_page = get_last_page()
    jobs = extract_jobs(last_page)
    return jobs










