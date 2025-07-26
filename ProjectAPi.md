***

# **Project**

This section outlines the operations available for managing projects within your organization.

### **Authorization**

All requests in this section require a **Bearer Token**.

---

## **Add Project**

Creates a new project in your organization.

<br>

`POST` `https://app.insightful.io/api/v1/project`

### **Request Parameters**

| Key | Format | Required | Description |
| :--- | :--- | :--- | :--- |
| `name` | string | required | The name of the project. |
| `description` | string | optional | The description of the project. |
| `employees[]` | string | required | The IDs of employees you want to assign to the project. |
| `statuses[]` | string | optional | The array of possible statuses. |
| `priorities[]` | string | optional | The array of possible priorities. |
| `billable` | boolean | optional | Is the project billable or not. |
| `deadline` | number | optional | Date in milliseconds when the project must be done. |
| `payroll` | ProjectPayroll | optional | Payroll details for the project. |

### **Headers**

| Key | Value |
| :--- | :--- |
| `Content-Type` | `application/json` |

### **Body**

```json
{
    "name": "",
    "description": "",
    "employees": [],
    "statuses": [],
    "priorities": [],
    "billable": false,
    "deadline": 0,
    "payroll": {
        "billRate": 0,
        "overtimeBillrate": 0
    }
}
```

---

### **Example Request**

```python
import requests
import json

url = "https://app.insightful.io/api/v1/project"

payload = json.dumps({
  "name": "Your project name",
  "description": "Your project description",
  "employees": [
    "wk59h7b0cq8b1oq",
    "w8jt496hid4shz3"
  ],
  "statuses": [
    "To Do",
    "In progress",
    "Done"
  ],
  "priorities": [
    "low",
    "medium",
    "high"
  ],
  "billable": True,
  "payroll": {
    "billRate": 25,
    "overtimeBillrate": 55
  }
})

headers = {
  'Authorization': 'Bearer YOUR_TOKEN_HERE',
  'Content-Type': 'application/json'
}

response = requests.request("POST", url, headers=headers, data=payload)

print(response.text)
```

### **Example Response**

**Status:** `200 OK`

```json
{
  "id": "wiotv0ilptz9uqg",
  "archived": false,
  "statuses": [
    "To Do",
    "In progress",
    "Done"
  ],
  "priorities": [
    "low",
    "medium",
    "high"
  ],
  "billable": true,
  "payroll": {
    "billRate": 25,
    "overtimeBillrate": 55
  },
  "name": "Your project name",
  "description": "Your project description",
  "employees": [
    "wk59h7b0cq8b1oq",
    "w8jt496hid4shz3"
  ],
  "creatorId": "wuiz-yuxbtr9aul",
  "organizationId": "wbtmikjuiimvh3z",
  "teams": [
    "wautlmuhdnndn7f"
  ],
  "createdAt": 1592926661681
}```

---

## **Get Project**

Fetches a project by its provided ID.

<br>

`GET` `https://app.insightful.io/api/v1/project/:id`

### **Path Variables**

| Key | Format | Required | Description |
| :--- | :--- | :--- | :--- |
| `id` | string | required | The unique identifier of the project. |

### **Example Request**

```python
import requests

url = "https://app.insightful.io/api/v1/project/wj7qcsinkdn7ugd"

headers = {
  'Authorization': 'Bearer YOUR_TOKEN_HERE'
}

response = requests.request("GET", url, headers=headers)

print(response.text)
```

### **Example Response (Success)**

**Status:** `200 OK`

```json
{
  "id": "wj7qcsinkdn7ugd",
  "archived": false,
  "statuses": [
    "To do",
    "On hold",
    "In progress",
    "Done"
  ],
  "priorities": [
    "low",
    "medium",
    "high"
  ],
  "billable": true,
  "payroll": {
    "billRate": 1,
    "overtimeBillRate": 1
  },
  "name": "Project 2",
  "employees": [],
  "creatorId": "wlaxrvp-a_wznu1",
  "organizationId": "wbtmikjuiimvh3z",
  "teams": [],
  "createdAt": 1592568826171
}
```

### **Example Response (Validation Error)**

**Status:** `400 Bad Request`

```json
{
  "type": "VALIDATION_ERROR",
  "message": "Parameters validation error!",
  "details": [
    {
      "type": "stringLength",
      "expected": 15,
      "actual": 14,
      "field": "id",
      "message": "The 'id' field length must be 15 characters long!",
      "nodeID": "antonije-pc-14756",
      "action": "pm.project.endpoint.get"
    }
  ]
}
```

---

## **Find Projects**

Retrieves a list of all projects in your organization.

<br>

`GET` `https://app.insightful.io/api/v1/project`

### **Example Request**

```python
import requests

url = "https://app.insightful.io/api/v1/project"

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
    "id": "w7wn6lphwsq820i",
    "archived": false,
    "statuses": [
      "To do",
      "On hold",
      "In progress",
      "Done"
    ],
    "priorities": ["low", "medium", "high"],
    "billable": true,
    "payroll": {"billRate": 1, "overtimeBillRate": 1},
    "name": "Project 1",
    "employees": [],
    "creatorId": "wr-sz9z22eojwz9",
    "organizationId": "wbtmikjuiimvh3z",
    "teams": [],
    "createdAt": 1592571902985
  },
  {
    "id": "wj7qcsinkdn7ugd",
    "archived": false,
    "statuses": [
      "To do",
      "On hold",
      "In progress",
      "Done"
    ],
    "priorities": ["low", "medium", "high"],
    "billable": true,
    "payroll": {"billRate": 1, "overtimeBillRate": 1},
    "name": "Project 2",
    "employees": [],
    "creatorId": "wlaxrvp-a_wznu1",
    "organizationId": "wbtmikjuiimvh3z",
    "teams": [],
    "createdAt": 1592568826171
  }
]
```

---

## **Update Project**

Performs an update on a project specified by ID and retrieves the project object after a successful update.

<br>

`PUT` `https://app.insightful.io/api/v1/project/:id`

### **Path Variables**

| Key | Format | Required | Description |
| :--- | :--- | :--- | :--- |
| `id` | string | required | The unique identifier of the project to update. |

### **Request Parameters**

| Key | Format | Required | Description |
| :--- | :--- | :--- | :--- |
| `name` | string | optional | The new name of the project. |
| `description` | string | optional | The new description of the project. |
| `employees[]` | string | optional | The new list of employee IDs assigned to the project. |
| `statuses[]` | string | optional | The new array of possible statuses. |
| `priorities[]` | string | optional | The new array of possible priorities. |
| `billable` | boolean | optional | Is the project billable or not. |
| `deadline` | number | optional | New date in milliseconds for the project deadline. |
| `payroll` | ProjectPayroll | optional | New payroll details for the project. |
| `screenshotSettings` | ScreenshotSettings | optional | Settings for screenshots. |

### **Headers**

| Key | Value |
| :--- | :--- |
| `Content-Type` | `application/json` |

### **Body**

```json
{
    "name": "",
    "description": "",
    "employees": [],
    "statuses": [],
    "priorities": [],
    "billable": false,
    "deadline": 0,
    "payroll": {
        "billRate": 0,
        "overtimeBillrate": 0
    },
    "archived": false,
    "screenshotSettings": {
        "screenshotEnabled": false
    }
}
```

---

### **Example Request**

```python
import requests
import json

url = "https://app.insightful.io/api/v1/project/wiotv0ilptz9uqg"

payload = json.dumps({
  "name": "New Project name",
  "description": "New project description",
  "employees": [
    "wk59h7b0cq8b1oq"
  ]
})

headers = {
  'Authorization': 'Bearer YOUR_TOKEN_HERE',
  'Content-Type': 'application/json'
}

response = requests.request("PUT", url, headers=headers, data=payload)

print(response.text)
```

### **Example Response**

**Status:** `200 OK`

```json
{
  "id": "wiotv0ilptz9uqg",
  "archived": false,
  "statuses": [
    "To Do",
    "In progress",
    "Done"
  ],
  "priorities": [
    "low",
    "medium",
    "high"
  ],
  "billable": true,
  "payroll": {
    "billRate": 25,
    "overtimeBillrate": 55
  },
  "name": "New Project name",
  "description": "New project description",
  "employees": [
    "wk59h7b0cq8b1oq"
  ],
  "creatorId": "wuiz-yuxbtr9aul",
  "organizationId": "wbtmikjuiimvh3z",
  "teams": [
    "wautlmuhdnndn7f"
  ],
  "createdAt": 1592926661681
}
```

---

## **Delete Project**

Deletes a project by its provided ID.

<br>

`DELETE` `https://app.insightful.io/api/v1/project/:id`

### **Path Variables**

| Key | Format | Required | Description |
| :--- | :--- | :--- | :--- |
| `id` | string | required | The unique identifier of the project to delete. |

### **Example Request**

```python
import requests

url = "https://app.insightful.io/api/v1/project/w7wn6lphwsq820i"

headers = {
  'Authorization': 'Bearer YOUR_TOKEN_HERE'
}

response = requests.request("DELETE", url, headers=headers)

print(response.text)
```

### **Example Response**

**Status:** `200 OK`

The response body contains the details of the project that was just deleted.

```json
{
  "id": "w7wn6lphwsq820i",
  "archived": false,
  "statuses": [
    "To do",
    "On hold",
    "In progress",
    "Done"
  ],
  "priorities": [
    "low",
    "medium",
    "high"
  ],
  "billable": true,
  "payroll": {
    "billRate": 1,
    "overtimeBillRate": 1
  },
  "name": "Project 1",
  "employees": [],
  "creatorId": "wr-sz9z22eojwz9",
  "organizationId": "wbtmikjuiimvh3z",
  "teams": [],
  "createdAt": 1592571902985
}
```