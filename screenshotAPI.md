***

# **Screenshots**

This section describes the endpoints for managing and retrieving screenshot data.

### **Authorization**

All requests in this section require a **Bearer Token**.

---

## **List Screenshots**

Retrieves a list of screenshots based on a specified time range.

<br>

`GET` `https://app.insightful.io/api/v1/analytics/screenshot`

### **Query Parameters**

| Key | Format | Required | Description |
| :--- | :--- | :--- | :--- |
| `start` | number | required | Start of the time range as a Unix timestamp in milliseconds. |
| `end` | number | required | End of the time range as a Unix timestamp in milliseconds. |
| `limit` | number | optional | The maximum number of screenshots to return. Default is `15`. |

### **Example Request**

```python
import requests

url = "https://app.insightful.io/api/v1/analytics/screenshot?start=1592498100575&end=1592929252004&limit=15"

headers = {
  'Authorization': 'Bearer YOUR_TOKEN_HERE'
}

response = requests.request("GET", url, headers=headers)

print(response.text)
```

---

## **Delete Screenshot**

Deletes a screenshot by its unique ID.

<br>

`DELETE` `https://app.insightful.io/api/v1/analytics/screenshot/:id`

### **Path Variables**

| Key | Format | Required | Description |
| :--- | :--- | :--- | :--- |
| `id` | string | required | The unique identifier of the screenshot to delete. |

### **Example Request**

```python
import requests

url = "https://app.insightful.io/api/v1/analytics/screenshot/YOUR_SCREENSHOT_ID"

headers = {
  'Authorization': 'Bearer YOUR_TOKEN_HERE'
}

response = requests.request("DELETE", url, headers=headers)

print(response.text)
```

---

## **Paginate Screenshots**

Retrieves a paginated list of screenshots, allowing for more advanced filtering and sorting.

> **NOTE:** `cs string` represents a comma-separated string of IDs.

<br>

`GET` `https://app.insightful.io/api/v1/analytics/screenshot-paginate`

### **Query Parameters**

| Key | Format | Required | Description |
| :--- | :--- | :--- | :--- |
| `start` | number | required | Start of the time range as a Unix timestamp in milliseconds. |
| `end` | number | required | End of the time range as a Unix timestamp in milliseconds. |
| `timezone` | string | optional | The timezone to apply to the results. |
| `taskId` | cs string| optional | Comma-separated list of task IDs to filter by. |
| `shiftId` | cs string| optional | Comma-separated list of shift IDs to filter by. |
| `projectId`| cs string| optional | Comma-separated list of project IDs to filter by. |
| `sortBy` | ScreenshotSort | optional | The field to sort the results by. |
| `limit` | number | optional | The number of results to return per page. Default is `10000`. |
| `next` | string | optional | The hash value from the previous response used to fetch the next batch of data. |

### **Example Request**

```python
import requests

url = "https://app.insightful.io/api/v1/analytics/screenshot-paginate?start=1576002025594&end=1576602732849"

headers = {
  'Authorization': 'Bearer YOUR_TOKEN_HERE'
}

response = requests.request("GET", url, headers=headers)

print(response.text)
```

### **Example Response**

**Status:** `200 OK`

```json
{
  "data": [
    {
      "gateways": [
        "b0:ac:d2:54:71:6a"
      ],
      "id": "b3f265e0-e41b-4eea-a20a-4d0b03bf7114",
      "type": "scheduled",
      "timestamp": 1576002025594,
      "timezoneOffset": -3600000,
      "app": "Google Chrome",
      "appFileName": "Google Chrome.app",
      "appFilePath": "/Applications/Google Chrome.app",
      "title": "Workpuls | Employee Monitoring and Time Tracking Software - Google Chrome",
      "url": "http://app.workpuls.local:8000/#/app/settings/shared",
      "document": "",
      "windowId": "43e70af3-5529-4c8d-9126-ca661e0900d6",
      "shiftId": "",
      "projectId": "wirgndh4f2vnpdj",
      "taskId": "wmxiy1jtadoibfw",
      "taskStatus": "to do",
      "taskPriority": "low",
      "user": "milandinic",
      "computer": "milan’s macbook pro",
      "domain": "",
      "name": "Milan Dinic",
      "hwid": "489c8746-c41e-5f75-87dc-bba0f420f116",
      "os": "darwin",
      "osVersion": "18.2.0",
      "active": true,
      "processed": false,
      "createdAt": "2019-12-10T17:20:25.594Z",
      "updatedAt": "2019-12-10T17:20:25.594Z",
      "employeeId": "wgpw4lgwq2y4vmx",
      "teamId": "whkh7s1stoei4ml",
      "sharedSettingsId": "wecqwcgmor6qypc",
      "organizationId": "wts6fn6zccv5dnw",
      "appId": "wk34454ebmk9mu-",
      "appLabelId": "wejvrbosjibxg81",
      "categoryId": "",
      "categoryLabelId": "",
      "productivity": 1,
      "site": "app.workpuls.local:8000",
      "timestampTranslated": 1576002025594,
      "_index": "screenshots-smb-2019-12",
      "link": ""
    }
  ],
  "next": "eyJwYXJhbXMiOnsic3RhcnQiOiIxIiwiZW5kIjoiMTU5NTk3MzU5OTAwMCJ9LCJzZWFyY2hBZnRlciI6WzE1NzY1OTkxMzI4NDksImFhY2ZiMTJlLWEyOWMtNDczMC04ZmVjLWNmZjJlMzRmOTMxNCJdfQ=="
}
```