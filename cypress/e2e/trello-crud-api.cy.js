describe("trello crud api", () => {

    const trelloKey = "cb3301406e92d90a1b57b52a7a23537e";
    const trelloToken = "ATTA72ece6fc71433ab59c68bb4bbe4908943ba350cbea7972fe241bd111be82451aAAFDCD3E";
    const boardName = "viral " + parseInt(Math.random() * 1000);
    const listName = "viralLists " + Math.random().toString(36).substring(2, 7);
    const cardName = "new Card" + Math.random().toString(36).substring(2, 7);
    const updateCardName = "update Card" + Math.random().toString(36).substring(2, 7);

    it("CRUD api", () => {
        let boardId;
        let listId;
        let cardId;

        // Create a Board
        cy.request({
            method: "POST",
            url: `https://api.trello.com/1/boards/?key=${trelloKey}&token=${trelloToken}&name=${boardName}`
        }).then(response => {
            expect(response.status).to.eq(200);
            const jsonData = response.body;
            expect(jsonData.name).to.eq(boardName);
            boardId = jsonData.id;

            // Create a Lists
            cy.request({
                method: "POST",
                url: `https://api.trello.com/1/lists?name=${listName}&idBoard=${boardId}&key=${trelloKey}&token=${trelloToken}`
            }).then(response => {
                expect(response.status).to.eq(200);
                const jsonListData = response.body;
                expect(jsonListData.name).to.eq(listName);
                listId = jsonListData.id;

                // Create a Card
                cy.request({
                    method: "POST",
                    url: `https://api.trello.com/1/cards?idList=${listId}&key=${trelloKey}&token=${trelloToken}&name=${cardName}`
                }).then(response => {
                    expect(response.status).to.eq(200);
                    const jsonCardData = response.body;
                    expect(jsonCardData.name).to.eq(cardName);
                    cardId = jsonCardData.id;

                    //Update a Card
                    cy.request({
                        method: "PUT",
                        url: `https://api.trello.com/1/cards/${cardId}?key=${trelloKey}&token=${trelloToken}&name=${updateCardName}`
                    }).then(response => {
                        expect(response.status).to.eq(200);
                        const body = response.body;
                        expect(body.name).to.eq(updateCardName);

                        //Delete a Board
                        cy.request({
                            method: "DELETE",
                            url: `https://api.trello.com/1/boards/${boardId}?key=${trelloKey}&token=${trelloToken}`,
                            failOnStatusCode: false
                        }).then(response => {
                            expect(response.status).to.eq(200);
                        })
                    })
                })
            })
        })
    })


})