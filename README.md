# Design Choices

## Frontend Framework: React
React was chosen for its efficiency in building interactive user interfaces and component-based architecture, aligning with the objective of creating a user-friendly and accessible interface.

## Backend Infrastructure: Firebase Functions and Firestore
Firebase Functions and Firestore are utilized for the backend infrastructure to handle serverless computing and scalable data storage, ensuring efficient handling of backend logic and seamless integration with the frontend.

## Regular Expressions for Macro Processing
Regular expressions are employed to detect and extract macro phrases from user input text. This approach enhances the accuracy of macro detection and streamlines the processing logic.

## GPT-4.0 Integration
OpenAI's GPT-4.0 API is integrated to process text inputs, identify macros, and retrieve relevant information, enabling advanced natural language processing to accurately identify and process macros within radiology transcripts.

## Firestore Database Integration
Firestore is used for storing and retrieving macro data, providing real-time data synchronization and scalable database queries, ensuring efficient management of macro data in the cloud.

## Error Handling
Robust error handling mechanisms are implemented throughout the application to manage scenarios where macros are not found or inputs are invalid, ensuring a smooth user experience and enhancing the application's reliability.

## User Interface
The user interface is designed using React components, with clear input areas for radiology transcripts and display sections for processed results, prioritizing usability and accessibility.

## Implementation Details
### API Key and Data Loading:
- The OpenAI API key is securely stored and accessed using Firebase Functions.
- Macro data from the provided CSV file is loaded and parsed using Firebase Functions for efficient processing.

### Trigger Words and Macro Expansion:
- Trigger words such as "insert" and "input" are identified in user input text, triggering macro expansion when followed by a predefined macro phrase.
- Regular expressions are utilized for pattern matching to accurately detect trigger words and macros.

### System Message Preparation:
- A system message is prepared to prompt users to input radiology transcripts, providing information about available macros. 
- This system message enhances user guidance and facilitates seamless interaction with the application.

### ChatGPT Function Calling and Context Awareness:
- The application calls the ChatGPT function, providing the current transcript context along with trigger words detected in the input text.
- This enables the GPT-4.0 model to generate context-aware responses, incorporating the identified trigger words and associated macro phrases.
- The output from GPT-4.0 is then processed to insert the macro text from the macro phrase following the trigger words, ensuring that the generated output accurately reflects the context and intent of the user's input.

## Additional Steps
- **Build Macro Database:**
  - Establish a database infrastructure to store macro phrases, their corresponding macro texts, and embeddings.
  - Develop a data pipeline to populate the macro database with relevant information.
  - Implement scheduled tasks or event triggers to keep the macro database updated with new macro entries and embeddings.

Due to time constraints, the creation of a comprehensive macro database and integration with a vector database couldn't be completed. However, leveraging the existing embeddings stored in Firestore lays the groundwork for future expansion and optimization of the macro processing system.
