## URL Query Parameters Support

The Case Summarization UI supports prepopulating certain fields using query parameters in the URL. When you include specific parameters in the URL, the application will automatically set the corresponding values in the relevant fields.

### Supported Query Parameters

-   **claimant_id**: The unique identifier for the claimant. Example: `claimant_id=2342343`
-   **start_date**: The start date for the case or data range (format: `MM-DD-YYYY`).
-   **end_date**: The end date for the case or data range (format: `MM-DD-YYYY`).

### Example Usage

You can launch the application with pre-filled values by appending the parameters to the URL, for example:

```
http://localhost:5173/?claimant_id=2342343&start_date=03-20-2023&end_date=03-30-2023
```
