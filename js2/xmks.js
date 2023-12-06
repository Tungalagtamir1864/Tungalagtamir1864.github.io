console.log("start");

class Project {
  constructor(ob) {
    this.id = ob.id; 
    this.imgLink = ob.imgLink;
    this.companyName = ob.companyName;
    this.location = ob.location;
    this.date = ob.date;
  }

  render() {
    return `<article class="project_item">
              <img src="${this.imgLink}" alt="">
                <div class="project_text">
                  <h3>${this.companyName}</h3>
                  <p> ${this.location}</p>
                  <p>${this.date}</p>
                </div>
            </article>`;
  }

  bind(eventType, element, property) {
    gebi(`${element}_${this.id}`).addEventListener(eventType, (event) => {
      this[property] = event.target.innerHTML;
      project_item._hasChanged = true;
      console.log(`event:${event} this=${JSON.stringify(project_item)}`);
    });
    return this;
  }
}

export default class RecentProject {
  constructor(recentProjectUrl, dateFilter) {
    this._recentProjectList = [];
    this._recentProjectUrl = recentProjectUrl;
    this._lastUpdated = Date.now();
    this._hasChanged = false;
    this.dateFilter = dateFilter;
  }

  upload() {
    if (this._hasChanged) {
      fetch(this._recentProjectUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          versioning: false,
        },
        body: JSON.stringify(this._recentProjectList),
      })
        .then((response) => {
          console.log(response.status);
        })
        .catch((err) => {
          console.log(err);
        });

      this._hasChanged = false;
    }
  }

  download(targetElement) {
    fetch(`${this._recentProjectUrl}/latest`)
      .then((result) => {
        result.json().then((jsob) => {
          const filteredArray = jsob.record.records.filter(
            (item) => Date.parse(item.date) > this.dateFilter
          );

          //updating own javascript
          if (filteredArray.length > 0) {
            gebi(targetElement).insertAdjacentHTML(
              "afterbegin",
              filteredArray
                .map((newProject) => {
                  const _newProject = new Project(newProject);
                  this._recentProjectList.push(_newProject);
                  return _newProject.render();
                })
                .reduce((prevVal, curVal) => prevVal + curVal, "")
            );

            this._recentProjectList.forEach((project_item) =>
              project_item.bind("input", `recentproject_${project_item.id}`, "location")
            );
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

const params = new URLSearchParams(document.location.search);
const dateFilter = params.get("date");

//shortcut to getElementById
const gebi = (id) => document.getElementById(id);


//Create RecentProject object, with url
const recentProject = new RecentProject(
  "https://api.jsonbin.io/v3/b/6554e0d454105e766fd0637f",
  Date.parse(dateFilter)
);

//Load content from RecentProjectURL
recentProject.download("main");

//Download project every 60 seconds into #main
setInterval(() => recentProject.download("main"), 60000);

//Upload updated project every 15 seconds back to the server
setInterval(() => recentProject.upload(), 15000);
console.log(dateFilter);