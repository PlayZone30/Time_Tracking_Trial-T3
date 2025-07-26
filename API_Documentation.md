## EMPLOYEE

| Key | Format | Description |
| :--- | :--- | :--- |
| `id` | string | The ID for the employee. |
| `name` | string | The name for the employee. |
| `teamsId` | string | The ID of the team which the employee now belongs to. |
| `sharedSettingsId` | string | The ID of shared settings applied to the employee. |
| `accountId` | string | The ID of the employee account in the Insightful application. |
| `identifier` | string | Unique ID of an employee based on email, computer logon, or domain logon info. |
| `type` | string | Type of shared settings applied on this employee. Values are `personal`, `office`. |
| `organizationId` | string | The ID of the organization which the employee belongs to. |
| `projects[]` | string | The IDs of projects which the employee has access to. |
| `deactivated` | number | Time in milliseconds representing the time since the employee was deactivated. |
| `invited` | number | Time in milliseconds representing the time elapsed from the time the invitation was sent to acceptance. |
| `systemPermissions` | IEmployeeSystemPermissions[] | List of system permissions that the employee used per computer. |
| `createdAt` | number | Time in milliseconds representing the time when the employee was created. |

### IEmployeeSystemPermissions

| Key | Format | Description |
| :--- | :--- | :--- |
| `computer` | string | Name of the computer from which the permissions were taken. |
| `permissions` | ISystemPermissions | |
| `createdAt` | number | Date in milliseconds when the item was created. |
| `updatedAt` | number | Date in milliseconds when the item was updated. |

### ISystemPermissions

| Key | Format | Description |
| :--- | :--- | :--- |
| `accessibility` | string | Options: `authorized`, `denied`, `undetermined`. |
| `screenAndSystemAudioRecording` | string | Options: `authorized`, `denied`, `undetermined`. |

## TEAM

| Key | Format | Description |
| :--- | :--- | :--- |
| `id` | string | The ID for the team. |
| `ignoreProductive` | boolean | If true, all productive applications won't be tracked for the team. |
| `ignoreNeutral` | boolean | If true, all neutral applications won't be tracked for the team. |
| `ignoreUnproductive` | boolean | If true, all unproductive applications won't be tracked for the team. |
| `ignoreUnreviewed` | boolean | If true, all unreviewed applications won't be tracked for the team. |
| `name` | string | The name of the team. |
| `description` | string | The description of the team. |
| `organizationId` | string | The ID of the organization which the team belongs to. |
| `default` | boolean | The flag which tells you if the team is default. |
| `employees[]` | string | Array of all employees in this team. |
| `projects[]` | string | Array of all projects in this team. |
| `createdAt` | number | Time in milliseconds representing the time when the team was created. |

## PROJECT

| Key | Format | Description |
| :--- | :--- | :--- |
| `id` | string | The ID for the project. |
| `archived` | boolean | Is the project archived or not. |
| `statuses[]` | string | Possible statuses for tasks. |
| `priorities[]` | string | Possible priorities for tasks. |
| `billable` | boolean | Is the project billable or not. |
| `payroll` | ProjectPayroll | Information about payroll. |
| `name` | string | The name of the project. |
| `description` | string | The description of the project. |
| `employees[]` | string | The employees assigned to the project. |
| `creatorId` | string | The user responsible for project creation. |
| `organizationId` | string | The ID of the organization. |
| `teams` | string | The array of team IDs to which employees belong. |
| `createdAt` | number | Date in milliseconds representing when the project was created. |
| `screenshotSettings` | ScreenshotSettings | Settings for screenshots. |

## TASK

| Key | Format | Description |
| :--- | :--- | :--- |
| `id` | string | The ID for the task. |
| `status` | string | The status for the task. |
| `priority` | string | The priority for the task. |
| `billable` | boolean | Is the task billable or not. |
| `name` | string | The name of the task. |
| `projectId` | string | The ID of the project the task belongs to. |
| `employees[]` | string | Employee IDs working on this project. |
| `description` | string | The description of the task. |
| `creatorId` | string | The user who created the task. |
| `organizationId` | string | The organization ID. |
| `teams[]` | string | Team IDs employees belong to. |
| `createdAt` | string | Date in milliseconds representing when the task was created. |

## Shared Settings

| Key | Format | Description |
| :--- | :--- | :--- |
| `id` | string | The ID for the settings. |
| `name` | string | The name for the settings. |
| `type` | SettingsType | Type of settings. |
| `settings` | Settings | The settings object. |
| `organizationId` | string | The ID of the organization. |
| `default` | boolean | Flag to mark if settings are default or not. |
| `createdAt` | string | Date in milliseconds representing when the settings were created. |

## Screenshot Response

| Key | Format | Description |
| :--- | :--- | :--- |
| `id` | string | The ID for the item. |
| `site` | string | Site used when the screenshot was taken. |
| `productivity` | number | Type of productivity. |
| `employeeId` | string | The ID of the employee. |
| `appId` | string | The ID of the app when the screenshot was taken. |
| `appOrgId` | string | The ID of the app org. |
| `appTeamId` | string | The ID of the app team. |
| `teamId` | string | The ID of the team. |
| `organizationId` | string | The ID of the organization. |
| `srcEmployeeId` | string | The ID of the merged employee. |
| `srcTeamId` | string | The team ID of the merged employee. |
| `timestampTranslated`| string | Timestamp in milliseconds translated to UTC. |
| `systemPermissions`| ISystemPermissions | Optional. System permissions if any were provided for the screenshot. |
| `next` | string | Hash value that is used to fetch the next batch of data. |

## Video Session Response

| Key | Format | Description |
| :--- | :--- | :--- |
| `id` | string | The ID for the settings. |
| `employeeId` | string | The ID of the employee. |
| `teamId` | string | The ID of the team. |
| `organizationId` | string | The ID of the organization. |
| `srcEmployeeId` | string | The ID of the merged employee. |
| `srcTeamId` | string | The team ID of the merged employee. |
| `start` | number | Start of the item in milliseconds. |
| `end` | number | End of the item in milliseconds. |
| `timezone` | string | Timezone in which the item was created. |
| `duration` | number | Duration of the item. |
| `screens` | number | Number of screens. |
| `shiftId` | string | ID of the shift in which the item was created. |
| `projectId` | string | ID of the project in which the item was created if working with projects. |
| `taskId` | string | ID of the task in which the item was created if working with projects. |
| `computer` | string | Computer of the employee. |
| `next` | string | Hash value that is used to fetch the next batch of data. |

## Screen Recording Response

| Key | Format | Description |
| :--- | :--- | :--- |
| `id` | string | The ID for the settings. |
| `employeeId` | string | The ID of the employee. |
| `teamId` | string | The ID of the team. |
| `organizationId` | string | The ID of the organization. |
| `srcEmployeeId` | string | The ID of the merged employee. |
| `srcTeamId` | string | The team ID of the merged employee. |
| `start` | number | Start of the item in milliseconds. |
| `end` | number | End of the item in milliseconds. |
| `timezone` | string | Timezone in which the item was created. |
| `duration` | number | Duration of the item. |
| `width` | number | Width of the screen. |
| `height` | number | Height of the screen. |
| `mimeType` | string | Type of video. |
| `screenId` | string | ID of the screen. |
| `videoSessionId` | string | ID of the video session. |
| `manifestUrl` | string | URL of the manifest file. |
| `thumbnailUrl` | string | URL of the thumbnail. |
| `shiftId` | string | ID of the shift in which the item was created. |
| `projectId` | string | ID of the project in which the item was created if working with projects. |
| `taskId` | string | ID of the task in which the item was created if working with projects. |
| `computer` | string | Computer of the employee. |
| `next` | string | Hash value that is used to fetch the next batch of data. |

## Recording Chunk Response

| Key | Format | Description |
| :--- | :--- | :--- |
| `id` | string | The ID for the settings. |
| `start` | number | Start of the item in milliseconds. |
| `end` | number | End of the item in milliseconds. |
| `duration` | number | Duration of the item. |
| `videoSessionId` | string | ID of the video session. |
| `screenRecordingId` | string | ID of the screen recording. |
| `videoUrl` | string | URL of the video chunk. |
| `thumbnailUrl` | string | URL of the thumbnail. |

## SHIFT

| Key | Format | Description |
| :--- | :--- | :--- |
| `id` | string | The ID for the shift. |
| `token` | string | Token. |
| `type` | ShiftType | Type of shift. |
| `start` | number | Time in milliseconds when the shift started. |
| `end` | number | Time in milliseconds when the shift ended. |
| `timezoneOffset` | number | Timezone difference in milliseconds, between UTC and the current local time. |
| `name` | string | The name of the user. |
| `user` | string | The username of the user. |
| `domain` | string | Company domain. |
| `computer` | string | Computer name. |
| `hwid` | string | Hardware ID. |
| `os` | string | Operating system. |
| `osVersion` | string | Version of the operating system. |
| `paid` | boolean | Indicates if the employee is paid for work on the shift. |
| `payRate` | number | Employee's hourly pay rate. |
| `overtimePayRate` | number | Employee’s overtime hourly pay rate. |
| `overtimeStart` | number | A moment (timestamp in milliseconds) during the shift when overtime started. |
| `employeeId` | string | Employee ID. |
| `teamId` | string | Team ID. |
| `organizationId` | string | Organization ID. |
| `startTranslated` | number | It is calculated by subtracting the timezone offset from the start time of the shift. |
| `endTranslated` | number | It is calculated by subtracting the timezone offset from the end time of the shift. |
| `overtimeStartTranslated` | number | It is calculated by subtracting the timezone offset from the overtime start time. |
| `negativeTime` | number | Reserved field. |
| `deletedScreenshots` | number | Number of deleted screenshots during the shift. |
| `lastActivityEnd` | number | Time of the last activity on the shift. |
| `lastActivityEndTranslated` | number | It is calculated by subtracting the timezone offset from the end time of the last activity. |

## Activity

| Key | Format | Description |
| :--- | :--- | :--- |
| `id` | string | The ID for the activity. |
| `employeeId` | string | Employee ID. |
| `teamId` | string | Team ID. |
| `organizationId` | string | Organization ID. |
| `name` | string | The name of the user. |
| `user` | string | The username of the user. |
| `domain` | string | Company domain. |
| `computer` | string | Computer name. |
| `hwid` | string | Hardware ID. |
| `os` | string | Operating system. |
| `osVersion` | string | Version of the operating system. |
| `start` | number | Time in milliseconds when the shift started. |
| `end` | number | Time in milliseconds when the shift ended. |
| `timezoneOffset` | number | Timezone difference in milliseconds, between UTC and the current local time. |
| `startTranslated` | number | It is calculated by subtracting the timezone offset from the start time of the shift. |
| `endTranslated` | number | It is calculated by subtracting the timezone offset from the end time of the shift. |
| `shiftId` | string | ID of the shift. |
| `projectId` | number | The ID of the project. |
| `taskId` | string | The ID of the task. |
| `windowId` | string | The ID of the window. |
| `paid` | boolean | Indicates whether the employee is paid for the work on the shift or not during the activity. |
| `billable` | boolean | Indicates whether the project is billable or not. |
| `overtime` | boolean | Indicates whether the activity was created while the employee was working overtime or not. |
| `billRate` | number | Bill rate. |
| `overtimeBillRate` | number | Overtime bill rate. |
| `payRate` | number | Employee's hourly pay rate. |
| `overtimePayRate` | number | Employee’s overtime hourly pay rate. |
| `keystrokes` | number | Number of key strokes during the activity. |
| `systemPermissions`| ISystemPermissions | Optional. System permissions if any were provided for the screenshot. |
| `mouseClicks` | number | Number of clicks during the activity. |

## Window

| Key | Format | Description |
| :--- | :--- | :--- |
| `id` | string | The ID for the window. |
| `token` | string | Token. |
| `type` | WindowType | Type of window. |
| `start` | number | Time in milliseconds when the shift started. |
| `end` | number | Time in milliseconds when the shift ended. |
| `timezoneOffset` | number | Timezone difference in milliseconds, between UTC and the current local time. |
| `shiftId` | string | ID of the shift. |
| `projectId` | number | The ID of the project. |
| `taskId` | string | The ID of the task. |
| `taskStatus` | string | The status of the task. |
| `taskPriority` | string | The priority of the task. |
| `paid` | boolean | Indicates whether the employee is paid for the work on the shift or not during the window. |
| `billable` | boolean | Indicates whether the project is billable or not. |
| `overtime` | boolean | Indicates whether the window was created while the employee was working overtime or not. |
| `billRate` | number | Bill rate. |
| `overtimeBillRate` | number | Overtime bill rate. |
| `payRate` | number | Employee's hourly pay rate. |
| `overtimePayRate` | number | Overtime bill rate. |
| `note` | string | Task note. |
| `name` | string | The name of the user. |
| `user` | string | The username of the user. |
| `domain` | string | Company domain. |
| `computer` | string | Computer name. |
| `hwid` | string | Hardware ID. |
| `os` | string | Operating system. |
| `osVersion` | string | Version of the operating system. |
| `employeeId` | string | Employee ID. |
| `teamId` | string | Team ID. |
| `organizationId` | string | Organization ID. |
| `startTranslated` | number | It is calculated by subtracting the timezone offset from the start time of the shift. |
| `endTranslated` | number | It is calculated by subtracting the timezone offset from the end time of the shift. |
| `negativeTime` | number | Reserved field. |
| `deletedScreenshots` | number | Count of deleted screenshots during the window. |

### Window Type

| Format | Description |
| :--- | :--- |
| enum | Values are: `manual`, `tracked` |

## BREAK

| Key | Format | Description |
| :--- | :--- | :--- |
| `id` | string | The ID for the break. |
| `shiftId` | string | The ID of the shift. |
| `start` | number | Time in milliseconds when the shift started. |
| `end` | number | Time in milliseconds when the shift ended. |
| `timezoneOffset` | number | Timezone difference in milliseconds, between UTC and the current local time. |
| `name` | string | The name of the user. |
| `user` | string | The username of the user. |
| `domain` | string | Company domain. |
| `computer` | string | Computer name. |
| `hwid` | string | Hardware ID. |
| `os` | string | Operating system. |
| `osVersion` | string | Version of the operating system. |
| `employeeId` | string | Employee ID. |
| `teamId` | string | Team ID. |
| `organizationId` | string | Organization ID. |
| `startTranslated` | number | It is calculated by subtracting the timezone offset from the start time of the shift. |
| `endTranslated` | number | It is calculated by subtracting the timezone offset from the end time of the shift. |

## Fragment

| Key | Format | Description |
| :--- | :--- | :--- |
| `id` | string | The ID for the fragment. |
| `name` | string | The name of the user. |
| `user` | string | The username of the user. |
| `domain` | string | Company name. |
| `computer` | string | Computer name. |
| `hwid` | string | Hardware ID. |
| `os` | string | Operating system. |
| `osVersion` | string | Operating system version. |
| `start` | number | Time in milliseconds when the fragment started. |
| `end` | number | Time in milliseconds when the fragment ended. |
| `timezoneOffset` | string | Timezone difference in milliseconds, between UTC and the current local time. |
| `app` | string | Application name. |
| `appFileName` | string | Application executable's name. |
| `appFilePath` | string | Application executable's full path. |
| `title` | string | Application/Website Title. |
| `url` | string | Website URL. |
| `document` | string | Reserved field. |
| `active` | boolean | Indicates whether the application is active or not. |
| `gateways` | string[] | List of network adapters' MAC addresses. |
| `keystrokes` | number | Number of key strokes during the fragment. |
| `mouseClicks` | number | Number of clicks during the fragment. |
| `shiftId` | string | The ID of the shift. |
| `projectId` | string | The ID of the project. |
| `taskId` | string | The ID of the task. |
| `taskStatus` | string | The status of the task. |
| `taskPriority` | string | Task's priority. |
| `windowId` | string | The ID of the window. |
| `paid` | boolean | Indicates whether the employee is paid for the work on the shift or not during the fragment. |
| `billable` | boolean | Indicates whether the project is billable or not. |
| `overtime` | boolean | Indicates whether the fragment was created while the employee was working overtime or not. |
| `billRate` | number | Bill rate. |
| `overtimeBillRate` | number | Overtime bill rate. |
| `payRate` | number | Employee's hourly pay rate. |
| `site` | string | Site address. |
| `productivity` | ProductivityType | Type of productivity. |
| `appId` | string | The ID of the app. |
| `appOrgId` | string | The ID of the app org. |
| `appTeamId` | string | The ID of the app team. |
| `organizationId` | string | The ID of the organization. |
| `teamId` | string | The ID of the team. |
| `activityId` | string | The ID of the activity. |
| `startTranslated` | number | It is calculated by subtracting the timezone offset from the start time of the fragment. |
| `endTranslated` | number | It is calculated by subtracting the timezone offset from the end time of the fragment. |
| `next` | string | Hash value that can be used for fetching the next bunch of data if the result is bigger than 10000 records. |

## Productivity

| Key | Format | Description |
| :--- | :--- | :--- |
| `productivity` | ProductivityType | Type of productivity. |
| `usage` | number | Sum of usage. |

### Productivity Type

> **NOTE:** 0 represents unreviewed time.

| Format | Description |
| :--- | :--- |
| enum | Values are: `0`, `1`, `2`, `3` |

## Project Time

| Key | Format | Description |
| :--- | :--- | :--- |
| `id` | string | Project ID. |
| `time` | number | Total sum of the time spent on one task. |
| `costs` | number | Total costs. |
| `income` | number | Total income. |

## App

| Key | Format | Description |
| :--- | :--- | :--- |
| `appId` | string | The ID of the application. |
| `usage` | number | Sum of usage. |
| `name` | string | Name of the application. |

## App-team (analytics)

| Key | Format | Description |
| :--- | :--- | :--- |
| `appTeamId` | string | The ID of the app team. |
| `usage` | number | Sum of usage. |
| `name` | string | The name of the application. |
| `appId` | string | The ID of the application. |
| `productivity` | ProductivityType | Type of productivity. |

### Shift Type

| Format | Description |
| :--- | :--- |
| enum | Values are: `manual`, `automated`, `scheduled`, `leave` |

## Filter Params

> **NOTE:** `cs string` - comma-separated string.

| Key | Format | Required | Description |
| :--- | :--- | :--- | :--- |
| `start` | number | required | Date in milliseconds. |
| `end` | number | required | Date in milliseconds. |
| `groupBy` | GroupBy | optional | By which parameter you want to group response data. |
| `timezone` | string | optional | If passed, data will be shown as in a particular timezone. |
| `employeeId`| cs string| optional | Get result for specific employees. |
| `teamId` | cs string| optional | Get result for specific teams. |
| `projectId` | cs string| optional | Get result for specific projects. |
| `taskId` | cs string| optional | Get result for specific tasks. |
| `shiftId` | cs string| optional | Get result for specific shifts. |
| `appId` | cs string| optional | Get result for specific apps. |
| `productivity`| string | optional | Get result by productivity. |

### GroupBy

| Format | Description |
| :--- | :--- |
| enum | Values are: `day`, `week`, `month`, `employee`, `team`, `shift`, `task`, `project`, `window` |

### ScreenshotSort

| Format | Description |
| :--- | :--- |
| enum | Values are: `productivity`, `name`, `user`, `app`, `title`, `url`, `shiftId`, `projectId`, `taskId`, `WindowId`, `appOrgId`, `appTeamId`, `employeeId`, `teamId` |

### Settings Type

| Format | Description |
| :--- | :--- |
| enum | Values are: `personal`, `office` |

### Tracking Type

| Format | Description |
| :--- | :--- |
| enum | Values are: `unlimited`, `limited`, `network`, `project`, `manual` |

### Week Days

| Key | Format | Required |
| :--- | :--- | :--- |
| `monday` | boolean | required |
| `tuesday` | boolean | required |
| `wednesday` | boolean | required |
| `thursday` | boolean | required |
| `friday` | boolean | required |
| `saturday` | boolean | required |
| `sunday` | boolean | required |

### Privilege

| Format | Description |
| :--- | :--- |
| enum | Values are: `read`, `write` |

## Employee Privileges

| Key | Format | Required | Description |
| :--- | :--- | :--- | :--- |
| `apps` | boolean | required | Provide access to AppUsage data, if true. |
| `productivity` | boolean | required | Provide access to Productivity data, if true. |
| `screenshots` | Privilege / false | required | Controls access to screenshots. |
| `pm` | Privilege / false | required | Controls access to PM. |
| `offline` | Privilege / false | required | Provide access to offline time data, if true. |

## Settings

> **NOTE:** Settings can be one of the following types:
> `UnlimitedSettings` | `LimitedSettings` | `NetworkSettings` | `ProjectSettings` | `ManualSettings`

### BaseSettings

| Key | Format | Required | Description |
| :--- | :--- | :--- | :--- |
| `type` | TrackingType | required | Type of tracking. |
| `idle` | number | required | Idle time. |
| `breaks` | number | required | Breaks. |
| `screenshots` | number | required | Screenshots. |
| `days` | WeekDays | required | Days. |
| `icon` | boolean | required | Agent shows app icon on the taskbar, if true. |
| `timer` | boolean | required | Agent shows Projects and Tasks, if true. |
| `clocker` | boolean | required | Agent shows timer, if true. |
| `privileges` | EmployeePrivilege | required | Privileges of an employee. |

### UnlimitedSettings

> **NOTE:** `UnlimitedSettings` includes all properties from `BaseSettings` but the `type` property needs to be set to `unlimited`.

### LimitedSettings

> **NOTE:** `LimitedSettings` includes all properties from `BaseSettings` but the `type` property needs to be set to `limited` and has two more properties.

| Key | Format | Required | Description |
| :--- | :--- | :--- | :--- |
| `start` | number | required | Shift start time. |
| `end` | number | required | Shift end time. |

### NetworkSettings

> **NOTE:** `NetworkSettings` includes all properties from `BaseSettings` but the `type` property needs to be set to `network` and has one more property.

| Key | Format | Required | Description |
| :--- | :--- | :--- | :--- |
| `network[]` | Network | required | List of router MAC addresses. |

### ProjectSettings

> **NOTE:** `ProjectSettings` includes all properties from `BaseSettings` but:
> *   `type` needs to be set to `project`.
> *   `breaks` needs to be set to `0`.
> *   `icon` needs to be set to `true`.
> *   `timer` needs to be set to `true`.
> *   `clocker` needs to be set to `false`.

### ManualSettings

> **NOTE:** `ManualSettings` includes all properties from `BaseSettings` but:
> *   `type` needs to be set to `manual`.
> *   `icon` needs to be set to `true`.
> *   `clocker` needs to be set to `true`.

## Network

| Key | Format | Required | Description |
| :--- | :--- | :--- | :--- |
| `name` | string | required | Network Name. |
| `macAddress` | string | required | Router MAC address. |

## Payroll

| Key | Format | Required | Description |
| :--- | :--- | :--- | :--- |
| `billRate` | number | required | Bill rate. |
| `overtimeBillRate` | number | optional | Overtime bill rate. |

## ProjectPayroll

| Key | Format | Required | Description |
| :--- | :--- | :--- | :--- |
| `employeeId` | Payroll | required | Payment details for every employee separately or use `*` to target every employee. |

## ScreenshotSettings

| Key | Format | Required | Description |
| :--- | :--- | :--- | :--- |
| `screenshotEnabled` | boolean | required | Enable/disable screenshots. |

### ApplicationType

> **NOTE:** `App` represents a desktop application.

| Format | Description |
| :--- | :--- |
| enum | Values are: `app`, `site` |

## AppTeam

| Key | Format | Description |
| :--- | :--- | :--- |
| `usage` | number | Usage in milliseconds for the app team. |
| `type` | AppType | Type of application. |
| `name` | string | Name of the application. |
| `appId` | string | ID of the application. |
| `appOrgId` | string | ID of the parent app org. |
| `teamId` | string | ID of the team. |
| `organizationId` | string | ID of the organization. |
| `labelOrg` | ProductivityType | Productivity of the app org. |
| `label` | ProductivityType | Productivity of the app team. |
| `ignoreOrg` | boolean | Ignore property on the app org. |
| `ignore` | boolean | Ignore property for the app team. |
| `alwaysActiveOrg` | boolean | `alwaysActive` property on the app org. |
| `alwaysActive` | boolean | `alwaysActive` property for the app team. |
| `ignoreScreenshotsOrg` | boolean | `ignoreScreenshots` property on the app org. |
| `ignoreScreenshots` | boolean | `ignoreScreenshots` property on the app team. |
| `productivity` | ProductivityType | Type of productivity. |
| `tags` | string[] | List of tags assigned to the app-team. |
| `tagsOrg` | string[] | List of tags assigned to the app-org. |

## AppOrg

| Key | Format | Description |
| :--- | :--- | :--- |
| `usage` | number | Usage in milliseconds for the app org. |
| `type` | AppType | Type of application. |
| `name` | string | Name of the application. |
| `appId` | string | ID of the application. |
| `organizationId` | string | ID of the organization. |
| `label` | ProductivityType | Productivity of the app org. |
| `ignore` | boolean | Ignore property for the app org. |
| `alwaysActive` | boolean | `alwaysActive` property for the app org. |
| `ignoreScreenshots` | boolean | `ignoreScreenshots` property for the app org. |
| `productivity` | ProductivityType | Type of productivity. |
| `tags` | string[] | List of tags assigned to the app-org. |

## Directory

| Key | Format | Description |
| :--- | :--- | :--- |
| `type` | DirectoryType | Type of directory. |
| `sumSync` | number | Summarized number of syncs. |
| `organizationId` | string | ID of the organization. |
| `isActive` | boolean | Whether the directory is active or not. |
| `settings` | DirectorySettings | Settings of the directory. |

### DirectoryType

> **NOTE:** `CSV` - CSV directory type.

| Format | Description |
| :--- | :--- |
| enum | Values are: `csv` |

### DirectorySettings (ICSVSettings)

| Key | Format | Description |
| :--- | :--- | :--- |
| `threshold` | number | Minimum number of actions for auto-approve. `0` -> never auto-approve. |
| `scopeInheritance` | boolean | Whether there will be an inheritance of scopes for managers. |

## DirectorySync

| Key | Format | Description |
| :--- | :--- | :--- |
| `organizationId` | string | ID of the organization. |
| `directoryId` | string | ID of the directory. |
| `status` | DirectorySyncStatus | Status of the sync. |
| `errorMessage` | string | Message of the error if it happens. |

### DirectorySyncStatus

> **NOTE:** `AutoApprove` - sync is auto-approved.

| Format | Description |
| :--- | :--- |
| enum | Values are: `AutoApprove`, `ApprovedBy`, `WaitingForApprovement`, `Disapproved`, `AnotherSyncApproved`, `ErrorWhileProcessing`, `InProgress` |

## Alert

| Key | Format | Description |
| :--- | :--- | :--- |
| `adminIds` | string[] | List of IDs of admins or an asterisk sign (`*`). |
| `managerIds` | string[] | List of IDs of managers or an asterisk sign (`*`). |
| `recipients` | AlertRecipients | Recipient type. |
| `employeeIds` | string[] | List of IDs of employees or an asterisk sign (`*`). |
| `teamIds` | string[] | List of IDs of teams or an asterisk sign (`*`). |
| `settings` | AlertSettings | |
| `days` | [Week Days](#week-days) | Days on which alerts will be triggered. |
| `active` | boolean | Whether the alert is active/inactive. The alert will not be sent if it is inactive. |
| `isRemoved` | boolean | Whether the alert is deleted (soft). The alert will not be sent if it is deleted. |
| `deliveryMethod` | NotificationDeliveryMethod | Delivery method of the alert. Can be one of the notification delivery methods, except it cannot be turned `Off`. |

### NotificationDeliveryMethod

| Format | Description |
| :--- | :--- |
| enum | Values are: `Off`, `InApp`, `InMail`, `All` |

### AlertRecipients

| Format | Description |
| :--- | :--- |
| enum | Values are: `onlyMe`, `allAdmins`, `specificUsers` |

### AlertType

| Format | Description |
| :--- | :--- |
| enum | Values are: `breakOverage`, `absentDays`, `missedClockIn`, `idleTime`, `usedApp`, `visitedWebsite`, `keywordDetection` |

### AlertSettings

> **NOTE:** Settings can be one of the following types:
> `BreakOverageSettings` | `AbsentDaysSettings` | `MissedClockInSettings` | `IdleTimeSettings` | `UsedAppSettings` | `VisitedWebsiteSettings` | `KeywordDetectionSettings`

### BreakOverageSettings

| Key | Format | Description |
| :--- | :--- | :--- |
| `type` | AlertType.BreakOverage | Type of alert. |

### AbsentDaysSettings

| Key | Format | Description |
| :--- | :--- | :--- |
| `type` | AlertType.AbsentDays | Type of alert. |
| `threshold` | number | Number of days which will trigger the alert. The minimum is 1 and the maximum is 365. |
| `timezone` | string (timezone) | Timezone. |

### MissedClockInSettings

| Key | Format | Description |
| :--- | :--- | :--- |
| `type` | AlertType.MissedClockIn | Type of alert. |
| `hour` | number | Hour of the intersection. The minimum is 0 and the maximum is 23. |
| `minute` | number | Minute of the intersection. The minimum is 0 and the maximum is 59. |
| `timezone` | string (timezone) | Timezone. |

### IdleTimeSettings

| Key | Format | Description |
| :--- | :--- | :--- |
| `type` | AlertType.IdleTime | Type of alert. |
| `threshold` | number | Number in minutes after which the alert will be triggered. The minimum is 10 and the maximum is 120. |

### UsedAppSettings

| Key | Format | Description |
| :--- | :--- | :--- |
| `type` | AlertType.UsedApp | Type of alert. |
| `apps` | UserAppAlert | ID of the application chosen from the list of apps from the platform. |
| `externalAppNames` | string[] | Application names to trigger the alert. |
| `takeScreenshot` | boolean, optional | Whether the screenshot will be taken at the moment when the alert is triggered again. |

### UserAppAlert

| Key | Format | Description |
| :--- | :--- | :--- |
| `id` | string | ID of the application from the platform. |
| `name` | string | Name of the application from the platform. |

### VisitedWebsite

| Key | Format | Description |
| :--- | :--- | :--- |
| `type` | AlertType.VisitedWebsite | Type of alert. |
| `urls` | string[] | List of URLs. Minimum 1 and maximum 15 URLs. |
| `condition` | AlertConditionType | Condition of the alert. |
| `takeScreenshot` | boolean, optional | Whether the screenshot will be taken at the moment when the alert is triggered again. |

### KeywordDetection

| Key | Format | Description |
| :--- | :--- | :--- |
| `type` | AlertType.KeywordDetection | Type of alert. |
| `keywords` | string[] | Keywords of which to trigger the alert. Minimum 1 and maximum 1000 keywords. |
| `condition` | AlertConditionType | Condition of the alert. |
| `takeScreenshot` | boolean, optional | Whether the screenshot will be taken at the moment when the alert is triggered again. |

### AlertConditionType

| Format | Description |
| :--- | :--- |
| enum | Values are: `equals`, `contains` |

## AppCategory

| Key | Format | Description |
| :--- | :--- | :--- |
| `id` | string | ID of the category. |
| `name` | string | Name of the category. |

## AppCategoryData

| Key | Format | Description |
| :--- | :--- | :--- |
| `categoryId` | string | ID of the category from the AppCategory model. |
| `usage` | number | Usage in milliseconds. |

## AppTag

| Key | Format | Description |
| :--- | :--- | :--- |
| `id` | string | ID of the tag. |
| `name` | string | Name of the tag. |
| `color` | string | Color of the tag as a HEX code. |

## AppTagData

| Key | Format | Description |
| :--- | :--- | :--- |
| `tagId` | string | ID of the tag from the AppTag model. |
| `usage` | number | Usage in milliseconds. |

### TimeLimitType

| Format | Description |
| :--- | :--- |
| enum | Values are: `day`, `week`, `month` |

## EmployeeTimeLimit

| Key | Format | Description |
| :--- | :--- | :--- |
| `id` | string | ID of the time limit. |
| `employeeId` | string | Employee ID to whom the limit is applied. If the value is `*` it means that it applies to all employees for a specific project. |
| `projectId` | string | Project ID to which the limit applies. |
| `limit` | number | Minimum 1. Limit of the item. |
| `type` | TimeLimitType | Type of the limit. |
| `start` | string | Format YYYY-MM-DD HH:MM:SS. When the limit should start. |
| `timezone` | string, not required | If provided, it applies to which timezone the limit is applied. |

## Scheduled Shift

| Key | Format | Description |
| :--- | :--- | :--- |
| `id` | string | ID of the scheduled shift. |
| `organizationId` | string | ID of the organization. |
| `employeeId` | string | ID of the employee. |
| `teamId` | string | ID of the team. |
| `bulkId` | string | ID of the batch of the added group of scheduled shifts. |
| `start` | number | When the scheduled shift should start. |
| `end` | number | When the scheduled shift should end. |
| `startTranslated` | number | When the scheduled shift should start in UTC. |
| `endTranslated` | number | When the scheduled shift should end in UTC. |
| `duration` | number | Duration of the scheduled shift. |
| `timezone` | string | In which timezone the scheduled shift is started. |
| `timezoneOffset` | number | Offset to UTC in milliseconds. |
| `tolerance` | number | Tolerance set from settings in milliseconds. |
| `earliestClockIn` | number | When the shift can start earliest in milliseconds. |
| `lateThreshold` | number | How many minutes of lateness will be tolerated in milliseconds. |
| `latestClockOut` | number | When the scheduled shift will be automatically clocked out. |

## Scheduled shift settings

| Key | Format | Description |
| :--- | :--- | :--- |
| `id` | string | ID of the settings. |
| `organizationId` | string | ID of the organization. |
| `earliestClockIn` | number | Number in minutes when a scheduled shift can be logged in. |
| `lateThreshold` | number | Number in minutes what is the tolerance for lateness. |
| `latestClockOut` | number | Number in minutes when a scheduled shift will be logged out. |
| `tolerance` | number | How many minutes are tolerated when an employee worked less than expected. |
| `notifyIntersection`| number | When the notification will be sent after the scheduled shift start for lateness and absence. |

## AUTHORIZATION

Bearer Token: `Token`