twu28_team_a
============

Development Environment Setup
-----------------------------

1. Clone the project repository using git.
2. Install HomeBrew (Mac users only)
3. Run "brew install gradle" for Mac. 

   For Linux users
   Download the source binary directly from the gradle website.
   Copy the downloaded folder to /usr/bin. Add the path to gradle bin folder to your /etc/profile file
   export PATH="$PATH:/usr/bin/gradle-1.1/bin"

4. Run "gradle build" to run all tests and build a WAR.
5. Run "gradle jettyRun" to deploy using jetty.

IntelliJ IDEA Setup
-------------------
1. Run "gradle idea" to create the project files
2. Open the twu28_team_a.ipr file

Extra Notes
-----------------
Please do "gradle build" before COMMITTING to the git repository. If the build failed, please DO NOT push your code
to the repository as it can break the build in the CI server.


Setting Environment Variable
-----------------------------
