describe("Delete Request",() =>{
    it("Delete Post api",()=>{
        cy.request({
            method: "DELETE",
            url: "http://localhost:3000/posts/2",
        }).then(response => {
            expect(response.status).to.eql(200);
        })
    })
})