# Backups

This folder contains the backups of the database created by Wakanda Server.

You can visit the [Wakanda Server Administration panel](http://127.0.0.1:8080/) to create backups on demand. If Wakanda Studio is connected to the server, it will retrieve those backups automatically and copy them in this folder.

Every backup contains:

- `backupManifest.json`: a JSON file with reporting information.
- `data`: a folder with your current database files.


For more information visit [Backup and Restore overview](http://doc.wakanda.org/home2.en.html#/Wakanda/0.Beta/Backup-and-Restore-Overview.300-965803.en.html)