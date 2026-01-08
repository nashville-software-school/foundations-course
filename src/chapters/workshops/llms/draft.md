ML 
flips probelm on its head 
tradition software human provides rules data and software produces output
in ML 
    - human provides data and output the system learns rules

    Software that learns patters from data
LLMs 
    - What are these LLMs predict the next word based on a sequence...
        yeah but how?
    they predict left to right!!!!! 
    lets remember this because it will be importnat to grok some nuances

    there are 3 main phases we should know about 


    1 Training (expensive time consuming part month and 100+ million dollars)
    2 Fine Tuning (from raw text predictor to useful chatbot etc...)
    3 Inferece (using the system)

    - Download the text from the inetrnet 
    - giant wall of text
    - Model has a dictionary token where subwords correspond to 
    id's this dictionary is determined ahead of time and fixed for the lifetime of the LLM
    - text/subwords is converted to theses tokens
        - tiktokenizer
        - illustration of subword tokens
        - the fact that the tokens are not aligned to char or exact words 
        can have some rough edges ()(will see later)
    
    - then we splice the internet text represented as tokens into sequences 
    - we hide the last ord in the sequence and try to guess it
    https://www.gutenberg.org/cache/epub/9109/pg9109.txt
    
    - semi sumervised learning
        meaning we have the word it should guess from the text but we intentionally hide it from the model and make it guess...
        - its a software that was designed to match patterns in data and during it's 
        training it starts getting better and better guessing what the missing word is.
        - its knowledge is represented as a giant math xpression with a bunch of coefficients , or you may hear weights ... it's basically 
        a long list of numbers 
        - in case of GPT3 for example a list of 175 billion 
        - so when you hear about Lama 7B vs 70B parameter model it refers to the 
        number of weights aka coefficients available to mattern match data... 
    - at first 100% random but over time towards the end of training 
        - but how? 
        - this is where we need to look at embeddings 
        - tokens are converted to embeddings , 
        - these are vectors or mathematical representations of lines 
            vectors in thousands of dimensions , number of dimensions 
            depends on the model LLama 7B has 4096
        - at the start we convert tokens to random vectors 
        - vector math and show vectors capture meaning
        - during traiing as the model gets better at guessing the misisng word 
        in its internal representation the vectors that are similar 
        are representad by similar vectors 

    - when trainig is done we end up with a pure next token guesser. 
    its not a refined conversationalist yet ..
    - it's internal representation of concepts are good
    - but it has no social skills
    - it's racist , sexist , etc...
    - example of a raw model 
    - so we need to fine tune it
    - fine tuning
    2 main approaches
        - supervised fine tuning
            - hallucinations    
               instructions here are human crafter questions and ideal confidents answers
                so the model learns to mimic this behavior
                even if the model is wrong it will try to give a confidents answer
                - during inference every token from the model dictionary has some probability 
                - even if wrong some token will have the highest probability
            
            
        - reinforcement learning from human feedback

    depending on which approach is used to fine tune the model
        will and up with a Standard or reasoning model. 
    
    - reinforcement learning is another form of AI where the system 
    is given a goal and it learns to achieve that goal by trial and error
    - this is used during fine tuning and as a result the model learn to mimic this 
    sort of chain of thousght reasoning deliberation , exterimentation to 
    achieve a goal

    think of it like giving the model a math problem and answer 
    let it make guesses some better than other and reward the better guesses until they

    - now that we have some idea how the model is trained and fine tuned
    - lets look at inference
    - during inference we give the model a prompt
    - prompt is converted to tokens
    - tokens are converted to embeddings
    - embeddings are processed by the model
    - model produces output embeddings
    - output embeddings are converted to tokens

- hallucinations    
        they happen because the model is a next token predictor
        it does not have a fact based knowledge base
        - when asked a question it will try to produce the most probable next token
        - it was also fine tuned to produce confidents answers
        - so if it does not know the answer it will try to make up something 

- sub word tokenization issues
        - because the model works with subword tokens 
        - the famous Strawberry problem 

- For math Step-by-step methods are safer for LLMs because predicting the next word left-to-right benefits from explicit intermediate steps, which guide the model toward consistent reasoning instead of a single high-risk token sequence.        

Example 1 (bad): Input: “What is 27 × 14?” → Output: 378, then a justification is written afterward to explain the result.

Example 2 (good): Input: “Here are my variables: a = 27 and b = 14; they need to be multiplied.” → The model defines the operation (a × b), computes intermediate results step by step, and outputs the final answer 378 at the end.


