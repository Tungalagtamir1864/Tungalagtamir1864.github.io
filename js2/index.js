console.log("start");

class Project {
  constructor(ob) {
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
                    <div>
                </article>`;
  }
}

class pro {
    constructor(projectURL) {
      this._projectURL = projectURL;
    }
  
    Download(targetElement) {
      fetch(`${this._projectURL}/latest`)
        .then(result => {
          result.json().then(jsob => {
            if (jsob.record && Array.isArray(jsob.record)) {
              const filteredPro = jsob.record.filter(item => item.profil);
              console.log(filteredPro);
              gebi(targetElement).insertAdjacentHTML(
                "afterbegin",
                filteredPro
                  .map(map => {
                    const _map = new Project(map);
                    return _map.render();
                  })
                  .reduce((p, c) => p + c, "")
              );
            } else {
              console.error("Invalid or missing 'record' field in the JSON data");
            }
          });
        })
        .catch(error => {
          console.error(error);
        });
    }
  }
  
  // ...
  
const gebi = (id) => document.getElementById(id);
const project = new pro("https://api.jsonbin.io/v3/b/6554e0d454105e766fd0637f");
project.Download("projects");
