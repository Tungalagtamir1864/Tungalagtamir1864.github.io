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

  Bind(eventType, element, property) {
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
    Upload() { 
        if (this._hasChanged) { 
            fetch(this._recentProjectUrl,
                {
                    method: 'PUT',
                    headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'versioning' : false
                },
                body: JSON.stringify(this._recentProjectList)
            })
                .then(response => { console.log(response.status); })
                .catch(err => { console.log(err) });

            this._hasChanged = false;
        }
    }
}
