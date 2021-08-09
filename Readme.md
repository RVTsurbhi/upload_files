# Upload and Download File in nodejs

---

**Upload file**

- use any multi-part module to upload file
- mimetype checks to upload only selected types of files
- saving buffer in database along with content type

---

---

**Download file**

- set response content type
- set Content-Disposition response header
- return buffer in response

---

---

_In a regular HTTP response, the Content-Disposition response header is a header indicating if the content is expected to be displayed inline in the browser, that is, as a Web page or as part of a Web page, or as an attachment, that is downloaded and saved locally._
