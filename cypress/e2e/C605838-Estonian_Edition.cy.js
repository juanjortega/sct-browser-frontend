import { it } from "mocha"
import AcceptCookiesDisclaimerPage from "../pages/AcceptCookiesDisclaimerPage"
import SNOMEDCTBrowserPage from "../pages/SNOMEDCTBrowserPage"
import DetailsPage from "../pages/DetailsPage"

const accept = new AcceptCookiesDisclaimerPage()
const searchpage = new SNOMEDCTBrowserPage()
const detailspage = new DetailsPage()

describe("C605838-Estonian Edition", () => {
it("Launch browser url", () => {
    accept.visit()
})
          
// Click on Accept cookies  
it("Click on Accept cookies", () => {
    accept.getCookiesAccept().click()
})
        
// Click on Accept disclaimers 
it("Click on Accept disclaimers", () => {
   accept.getDisclaimersAccept().click()
})

// Select Estonian Edition
it("Select Estonian Edition", () => {
   accept.getEstonianEdition().click()
})

// Search module and ensure that search records and record count is displayed
it("Search module and verify the search result", () => {
   searchpage.getSearch().type('module')
   cy.fixture('SNOMEDCTSearch').then((data) => {
   searchpage.getValidateSearchResult(data.InternationalEditionSearchResult)
   })
})

// Scroll the page
it("Scroll page", () => {
   cy.get('#fh-tabs-pane').scrollTo(0,500)
})

// Select Estonian module filter
it("Select Estonian module filter", () => {
    searchpage.getEstonianModuleFilter()
})

// Assert that the first result has a flag in the first column in the search results
it("Assert that the first result has a flag in the first column in the search results", () => {
    searchpage.getResultHaveFlags()
})

// Load the first result
it("Load the first result", () => {
    searchpage.getConcept().click()
    if(cy.get('#home-attributes-fh-cd1_canvas > h4').should('contain', 'Estonian module'))
    {
        cy.log('Selected concept loads into summary panel')
    }
})

// Click the details tab
it("Click the details tab", () => {
    cy.fixture('DetailsTab').then((data) => {
    detailspage.getDetailsTab(data.EstonianEditionConceptDetailsTab)
    })
})

})