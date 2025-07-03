# ComboBox Component

The `<app-combobox>` component is still in development.  It should behave in two different ways:

1. **Basic Mode** should behave just like the [Kendo ComboBox](https://www.telerik.com/kendo-angular-ui/components/dropdowns/combobox/) that it utilizes.

2. **Complex Mode** has a parent  child realtionship that is still in development. A visual representation of this behavior can be found in the wireframes (linked below) for the "Change Line of Service & Short Description" modal. In this case, "Short Description" is a child of "Line of Service."

Here's the basic gist of how the component should work when complete:

The `data` will need to be swapped out between three different states.

`[ __________________________________ ][ ▼ ]`  (empty field)
* Clicking the dropdown only shows the **Line of Service** list. (`data` state 1) (https://vixxo.invisionapp.com/d/main#/console/12571970/263645209/preview)
* Typing anything searches across both **Line of Service** and **Short Description**. (`data` state 2) (https://vixxo.invisionapp.com/d/main#/console/12571970/263645225/preview)
* Selecting a **Line of Service**, populates the input with the **Line of Service** with a colon appended. (e.g., "Plumbing:" )
* Selecting a **Short Description**, propulates the input with the associated **Line of Service** with a colon appeded, then the Short Description. (e.g., "Plumbling: Clogged Toilet Piping")

`[ Line of Service: _________________ ][ ▼ ]`  (only Line of Service in the field)
* Clicking the dropdown only shows the **Short Description** list. (`data` state 3) (https://vixxo.invisionapp.com/d/main#/console/12571970/263708533/preview)
* Typing anything searches across both **Line of Service** and **Short Description**. (https://vixxo.invisionapp.com/d/main#/console/12571970/263645225/preview) 

`[ Line of Service: Short Description ][ ▼ ]`  (both Line of Service and Short Description in the field)
* Clicking the dropdown only shows the **Line of Service** list. (https://vixxo.invisionapp.com/d/main#/console/12571970/263645209/preview)
* Typing anything searches across both **Line of Service** and **Short Description**. (https://vixxo.invisionapp.com/d/main#/console/12571970/263645225/preview)