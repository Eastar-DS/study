import requests
from bs4 import BeautifulSoup

#주소뒤에 50씩 더해줄거니까 따로빼서 변수로.

LIMIT = 50

def extract_indeed_pages(URL):
    result = requests.get(URL)
    
    #200 means ok
    # print(indeed_result)
    
    soup = BeautifulSoup(result.text, "html.parser")
    
    pagination = soup.find("div", {"class":"pagination"})
    
    links = pagination.find_all('a')
    pages = []
    
    # for link in links[:-1]:
    #     pages.append(link.find("span").string)
    #같은 결과
    for link in links[:-1]:
        pages.append(int(link.string))
    
    max_page = pages[-1]
    return max_page


def extract_job(html):
    title = html.find("span", title=True).text
    # company = html.find("span",{"class":"companyName"}).text
    company = html.find("span",{"class":"companyName"})
    #companyName이 비어있는경우처리
    if(company is not None):
        company_anchor = company.find("a")
        if(company_anchor is not None):
            company = company_anchor.text
        else:
            company = company.text
    # print(company, type(company))
    location = html.find("div",{"class":"companyLocation"}).text
    job_id = html["data-jk"]
    # print(job_id, type(job_id))
    # for _ in job_id:
    #     print(_["data-jk"])
    
    return {'title':title, 'company':company, 'location':location, "link": f"https://kr.indeed.com/%EC%B1%84%EC%9A%A9%EB%B3%B4%EA%B8%B0?jk={job_id}"}
    
 
def extract_indeed_jobs(last_page, URL):
    jobs = []
    for page in range(last_page):
        print(f"Scrapping Indeed Page: {page}")
    # for page in range(3,4):
        result = requests.get(f"{URL}&start={page*LIMIT}")
        soup = BeautifulSoup(result.text, "html.parser")
        
        # results = soup.find_all("div", {"class": "job_seen_beacon"})
        results = soup.find_all('a', {"class":"fs-unmask"})
        for result in results:
            job = extract_job(result)
            jobs.append(job)
            
            # # title = result.find_all("h2",{"class": "jobTitle"})
            # title = result.find("span", title=True).text
            # print(title)
            # company = result.find("span",{"class":"companyName"}).text
            # print(company)
            # #print(type(title), type(company))
    return jobs



def get_indeed_jobs(word):
    url = f"https://kr.indeed.com/jobs?q={word}&limit=50"
    last_indeed_page = extract_indeed_pages(url)
    indeed_jobs = extract_indeed_jobs(last_indeed_page, url)
    return indeed_jobs












