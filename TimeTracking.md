***

# **Time Tracking**

This section covers analytics endpoints related to time tracking.

### **Authorization**

All requests in this section require a **Bearer Token**.

---

## **Get Window Data**

Retrieves window analytics data based on specified filters. The response is an array of `Window` objects.

<br>

`GET` `https://app.insightful.io/api/v1/analytics/window`

### **Query Parameters**

| Key | Format | Required | Description |
| :--- | :--- | :--- | :--- |
| `start` | number | required | Start of the time range as a Unix timestamp in milliseconds. |
| `end` | number | required | End of the time range as a Unix timestamp in milliseconds. |
| `timezone` | cs string | optional | Timezone for the data. |
| `employeeId` | cs string | optional | Comma-separated string of employee IDs to filter by. |
| `teamId` | cs string | optional | Comma-separated string of team IDs to filter by. |
| `projectId` | cs string | optional | Comma-separated string of project IDs to filter by. |
| `taskId` | cs string | optional | Comma-separated string of task IDs to filter by. |
| `shiftId` | cs string | optional | Comma-separated string of shift IDs to filter by. |

---

### **Example Request**

```python
import requests

url = "https://app.insightful.io/api/v1/analytics/window?start=1592498100575&end=1592929252004"

headers = {
  'Authorization': 'Bearer YOUR_TOKEN_HERE'
}

response = requests.request("GET", url, headers=headers)

print(response.text)
```

### **Example Response**

**Status:** `200 OK`

```json
[
  {
    "id": "292aa814-9b1b-4ec3-8752-7403ae51977c",
    "type": "manual",
    "note": "",
    "start": 1592558256607,
    "end": 1592558320939,
    "timezoneOffset": -7200000,
    "shiftId": "8696b16d-136a-44cf-b553-77258fb2ddce",
    "projectId": "wauimd1z_j0sbgy",
    "taskId": "wfrk32jg36mdq99",
    "paid": false,
    "billable": true,
    "overtime": false,
    "billRate": 12,
    "overtimeBillRate": 0,
    "payRate": 0,
    "overtimePayRate": 0,
    "taskStatus": "in progress",
    "taskPriority": "low",
    "user": "janajovanovic",
    "computer": "jana’s macbook air",
    "domain": "",
    "name": "Jana Jovanovic",
    "hwid": "ee76a404-4168-52af-9d7a-856278de7f65",
    "os": "darwin",
    "osVersion": "18.2.0",
    "processed": false,
    "createdAt": "2020-06-19T07:17:36.608Z",
    "updatedAt": "2020-06-19T07:18:40.949Z",
    "employeeId": "wpuuerb5saeydb4",
    "teamId": "wide_zvn0ihbddz",
    "sharedSettingsId": "wecqwcgmor6qypc",
    "organizationId": "wts6fn6zccv5dnw",
    "startTranslated": 1592558256607,
    "endTranslated": 1592558320939,
    "negativeTime": 0,
    "deletedScreenshots": 0,
    "_index": "windows-smb-2020-06"
  },
  {
    "id": "5166bccb-919a-454e-a5a4-91deb420fd69",
    "type": "manual",
    "note": "",
    "start": 1592558320956,
    "end": 1592567089560,
    "timezoneOffset": -7200000,
    "shiftId": "8696b16d-136a-44cf-b553-77258fb2ddce",
    "projectId": "wcl6pilk_f89fzo",
    "taskId": "wgvmbjy5thviyp4",
    "paid": false,
    "billable": true,
    "overtime": false,
    "billRate": 13,
    "overtimeBillRate": 0,
    "payRate": 0,
    "overtimePayRate": 0,
    "taskStatus": "in progress",
    "taskPriority": "low",
    "user": "janajovanovic",
    "computer": "jana’s macbook air",
    "domain": "",
    "name": "Jana Jovanovic",
    "hwid": "ee76a404-4168-52af-9d7a-856278de7f65",
    "os": "darwin",
    "osVersion": "18.2.0",
    "processed": false,
    "createdAt": "2020-06-19T07:18:40.957Z",
    "updatedAt": "2020-06-19T09:44:49.566Z",
    "employeeId": "wpuuerb5saeydb4",
    "teamId": "wide_zvn0ihbddz",
    "sharedSettingsId": "wecqwcgmor6qypc",
    "organizationId": "wts6fn6zccv5dnw",
    "startTranslated": 1592558320956,
    "endTranslated": 1592567089560,
    "negativeTime": 0,
    "deletedScreenshots": 0,
    "_index": "windows-smb-2020-06"
  }
]
```

---

## **Get Project Time**

Retrieves aggregated project time analytics. The response is an array of `Project time` objects.

<br>

`GET` `https://app.insightful.io/api/v1/analytics/project-time`

### **Query Parameters**

| Key | Format | Required | Description |
| :--- | :--- | :--- | :--- |
| `start` | number | required | Start of the time range as a Unix timestamp in milliseconds. |
| `end` | number | required | End of the time range as a Unix timestamp in milliseconds. |
| `timezone` | cs string | optional | Timezone for the data. |
| `employeeId` | cs string | optional | Comma-separated string of employee IDs to filter by. |
| `teamId` | cs string | optional | Comma-separated string of team IDs to filter by. |
| `projectId` | cs string | optional | Comma-separated string of project IDs to filter by. |
| `taskId` | cs string | optional | Comma-separated string of task IDs to filter by. |
| `shiftId` | cs string | optional | Comma-separated string of shift IDs to filter by. |

---

### **Example Request**

```python
import requests

url = "https://app.insightful.io/api/v1/analytics/project-time?start=1592558256607&end=2574195046418"

headers = {
  'Authorization': 'Bearer YOUR_TOKEN_HERE'
}

response = requests.request("GET", url, headers=headers)

print(response.text)
```

### **Example Response**

**Status:** `200 OK`

```json
[
  {
    "id": "wauimd1z_j0sbgy",
    "time": 40291000,
    "costs": 0,
    "income": 134.30333333333334
  },
  {
    "id": "wcl6pilk_f89fzo",
    "time": 24617000,
    "costs": 0,
    "income": 88.89472222222221
  },
  {
    "id": "wadpaqg3e2fq_5g",
    "time": 4772000,
    "costs": 31.813333333333333,
    "income": 31.813333333333333
  },
  {
    "id": "wydpuyccgqka88b",
    "time": 255000,
    "costs": 0,
    "income": 0
  },
  {
    "id": "wix96xlsdsfyclg",
    "time": 2000,
    "costs": 0,
    "income": 0
  },
  {
    "id": "wsugiy4hyd2b1jw",
    "time": 107000,
    "costs": 0,
    "income": 0.2972222222222222
  },
  {
    "id": "wvd5ss11lynlupi",
    "time": 11863000,
    "costs": 32.952777777777776,
    "income": 46.13388888888889
  }
]
```