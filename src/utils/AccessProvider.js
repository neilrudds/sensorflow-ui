export default function AccessProvider(path, permittedPages) {  
    let isUserAuthorised = false;  
    let url = path.replace(/\//g, "");  
    let allowedActions = [];

    // If permittedPages exists
    if( Array.isArray(permittedPages) && permittedPages.length > 0) {    
      isUserAuthorised = permittedPages.find(page => page.modulePageUrl === url);  
      permittedPages.forEach(element => {      
        // If Url exists
        if(element.modulePageUrl === url){        
          // If Action exists
          if(( Array.isArray(element.actions) && element.actions.length > 0)){
            // Prepare Action List
            element.actions.forEach(item => {   
              allowedActions.push(item.actionUrl);
            });
          }
        }
      });
    }  
    return {
      isUserAuthorised,
      allowedActions
    };
  };