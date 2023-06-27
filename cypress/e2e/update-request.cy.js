describe("PUT Request", () => {

    it("Update a existong record using put api", () => {
        cy.request({
            method: "PUT",
            url: "http://localhost:3000/posts/2",
            body: {
                "title": "json-list in cypress"
            }
        }).then(response => {
            expect(response.status).to.eql(200);
        })
    })
})