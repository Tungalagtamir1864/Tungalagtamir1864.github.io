// app.js

// url
function getCategoryFromURL() {
  const params = new URLSearchParams(document.location.search);
  console.log(params.get("category"));
  return params.get("category");
}

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
              <img src="${this.imgLink}" alt="энхтун төсөлийн зураг">
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
      console.log("vmklfd");
    });
    return this;
  }
}

class RecentProject {
  constructor(recentProjectUrl) {
    this._recentProjectList = [];
    this._recentProjectUrl = recentProjectUrl;
    this._hasChanged = false;
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
    const category = getCategoryFromURL();

    fetch(this._recentProjectUrl, {
      headers: {
        "X-Master-Key": "$2b$10$YOUR_MASTER_KEY",
      },
    })
      .then((result) => result.json()) 
      .then((jsob) => {
        const filteredArray = jsob.record.records
          .filter((item) => item.profil)
          .filter((item) => (category ? item.date.includes(category) : true));

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
          project_item.bind(
            "input",
            `recentproject_${project_item.id}`,
            "location"
          )
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

//--------------------------
console.log("start");

const params = new URLSearchParams(document.location.search); // params үүсгэх
const profil = params.get("profil");
console.log(profil);

const recentProject = new RecentProject(
  "https://api.jsonbin.io/v3/b/6554e0d454105e766fd0637f",
  Date.parse(profil),
  getCategoryFromURL()
);

recentProject.download("main");

// setInterval(() => recentProject.download("main"), 60000);
// setInterval(() => recentProject.upload(), 15000);
// console.log(recentProject.dateFilter); // dateFilter гэсэн хувьсагчийг log хийж байна

// Helper function
function gebi(id) {
  return document.getElementById(id);
}
