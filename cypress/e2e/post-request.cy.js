describe("Post Request", () => {
    let validateOfTitle = new Array();

    it("Create a new Post api", () => {
        cy.request({
            method: "POST",
            url: "http://localhost:3000/posts",
            body: {
                "title": "Cypress post method",
                "author": "viral"
            }
        }).then(response => {
            expect(response.status).to.eql(201);
        })
    })

    it("Validate title of latest post", () => {
        cy.request({
            method: "GET",
            url: "http://localhost:3000/posts",
            headers: {
                accept: "application/json"
            }
        }).then(response => {
            let body = response.body;
            body.forEach(element => {
                validateOfTitle.push(element["title"]);
            });
        }).then(() => {
            let latestPost = validateOfTitle[validateOfTitle.length - 1];
            expect(latestPost).to.eq("Cypress post method");
        })
    })
})