<div id="top"></div>

<style>
table,tr {
    width:100%;
}
</style>
<!-- PROJECT LOGO -->
<br />
<div align="center">
  <h1 align="center"> YouPoll </h1>
  <h3>Creating polls for the people by the people</h3>
  _______________
  <br><br>
<table>
  <tbody>
    <tr>
        <td align="center">
          <img src="screenshots/gif/3%20-%20Answering%20polls.gif" alt="Tablet Demo" >
        </td>
        <td>
          <!-- TABLE OF CONTENTS -->
          <h2  align="center"> Table of Contents </h2>
          <div align="center">
            <div><a href="#built-with">Built With</a></div>
            <div><a href="#structure">User flow</a></div>
            <div><a href="#getting-started">How to test</a></div>
          </div>
          <br><br><br>
          <h2 align="center">Key Features</h2>
          <ol>
            <li>Create Polls</li>
            <li>View and vote on Polls</li>
            <li>Quick metrics on how many votes a poll has</li>
            <li>Result percentages</li>
            <li>Authenticated sign/in/up/out</li>
          </ol>
          <br><br><br><br><br><br><br><br><br>
        </td>
    </tr>
    <tr>
      <td align="center">
        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
      </td>
      <td align="center">
        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
      </td>
    </tr>
  </tbody>
</table>

<div id="built-with">
  <h2>Built With</h2>
  <p  align="right">
    (<a href="#top">back to top</a>)
  </p>
</div>
<table>
  <tbody>
    <tr>
        <td align="center">
          <img src="screenshots/gif/1%20-%20Login.gif" alt="Tablet Demo" >
        </td>
        <td>
          <ol>
                <img src="https://supabase.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fsupabase-logo-wordmark--dark.53d797e9.png&w=128&q=75">
            <li>Supabase</li>
                <ul>
                  <li>Authenticated users</li>
                  <li>Postgres database</li>
                  <li>Realtime subscriptions</li>
                </ul>
                <img src="screenshots/static/reactquery.png">
            <li>React query</li>
            <ul>
                  <li>Handles querying, mutation and caching</li>
                  <li>Invalidates queries on mutations/subscription hooks</li>
                </ul>
          </ol>
          <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
        </td>
    </tr>
    <tr>
      <td align="center">
        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
      </td>
      <td align="center">
        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
      </td>
    </tr>
  </tbody>
</table>
<br />
<br />

<div id="structure">
  <h2>User flow</h2>
  <p  align="right">
    (<a href="#top">back to top</a>)
  </p>
</div>
<div align="left">

```
    ├── {App starts}
    ├── Landing.tsx             # Checks session of supabase.auth user to send to "Login" or "Feed"
    ├── Login.tsx/Signup.tsx    # Creates/updates supabase.auth user to setup Auth state and session
    ...
    ├── Home.tsx                # Houses bottom tab navigation view
    │   ├── Feed.tsx            # Displays "polls" table with "answers" for quick info "votes" "created_at"
    │   ├── Poll.tsx            # Displays selected poll by "pollId", associated options and the percentage
    │   ├── Settings.tsx        # Allows logout/theme functionality and displays account info
    ...
    └── Create.tsx              # Displays create Poll form
```
</div>
<br />
<div id="getting-started">
  <h2>How to test</h2>
  <p  align="right">
    (<a href="#top">back to top</a>)
  </p>
</div>

## Step 1:
Install NPM packages
### `npm install` or `yarn install`
## Step 2:
Runs the ios app in the development mode.

```
If first time, make sure ios simulator is running
```
### `npm run ios` or `yarn run ios`
