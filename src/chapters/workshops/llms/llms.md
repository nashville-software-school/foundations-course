## Concepts We Will Cover

If you have spent any time around AI discussions you have likely heard terms like these used-often loosely, sometimes incorrectly. This section clarifies what we mean by them and how they fit together.

During this deep dive, we will explore the topics below with the overarching goal of gaining a deeper understanding of the technology and becoming more competent, confident users of it.

- **Machine Learning (ML)**
  What ML actually is, why it’s the core process behind LLMs and many AI systems, how models learn patterns from data rather than being explicitly programmed.

- **Large Language Models (LLMs)**  
  What makes a model "large," what problems these models are designed to solve, and what they fundamentally are *and are not*.

- **Model Training**  
  What does it mean to train an LLM, how is it trained, the difference between pre-training and fine-tuning, and why training efficiency-not just model size-enabled modern systems to exist.

- **Bias**  
  How bias enters models through training data and optimization objectives, why it cannot be fully "removed," and how alignment and grounding mitigate-but do not eliminate-it.

- **Context Windows**  
  What a context window is, why it has a hard limit, how it affects cost and latency, and why longer conversations slow models down.

- **Hallucinations**  
  Why LLMs sometimes generate confident but incorrect information, and how this behavior follows directly from next-token prediction.

- **Transformers**  
  The core neural architecture that powers modern LLMs, why it replaced older sequential models, and how it enables massive parallelization.

- **Encoder–Decoder vs Decoder-Only Models**  
  The architectural distinction between classic transformer designs and modern generative models like GPT, and why this matters for generation versus understanding tasks.

- **Attention and Attention Heads**  
  How self-attention allows models to assign context-dependent meaning to words, and why multiple attention heads are necessary to capture linguistic nuance.

By the end of this discussion, these terms should no longer feel like opaque buzzwords. Instead, they will form a coherent mental model that explains how LLMs behave, where their limits come from, and how to use them effectively and responsibly.

## Machine Learning (ML)
Language models are a class of machine learning models. Instead of relying on hand-written rules like traditional software, they learn patterns directly from data. 

### Traditional Programming

* Humans write explicit rules:

  ```javascript
  if condition:
      do X
  else:
      do Y
  ```
* Behavior is:

  * Deterministic
  * Auditable
  * Based on logic written by humans

### Machine Learning (Including LLMs)

* Humans do **not** write rules
* Instead:

  * Provide data
  * Define an objective
  * Let the model learn statistical patterns
* Behavior is:

  * Probabilistic
  * Emergent
  * Not directly traceable to rules

Traditional software follows rules we write; machine learning systems infer patterns we don’t explicitly control.

## Large Language Models (LLMs)

Our goal is to develop intuition about the mechanics beneath the surface of these systems, knowing their limitations like hallucinations, bias, boundaries of alignment, context window size, or training data constraints makes one a more effective user.

## The Core Insight: LLMs Are Advanced Autocomplete

At their foundation, large language models perform one task:

> **Given a sequence of tokens, predict the most likely next token.**

That’s it.

They are statistical machines trained to model probability distributions over language. 
Everything else: summarization, code generation, analysis-emerges from this single mechanism at scale.

## The Five Core Ingredients of Modern LLMs

Modern LLMs rely on five key components:

1. **Massive datasets** (the "large" in LLM)
2. **Transformer architecture** (parallel processing)
3. **Pre-training** (learning raw statistical structure)
4. **Fine-tuning & instruction training**
5. **Alignment layers** (e.g., RLHF)

Each component contributes directly to scale, performance, and usability.



## Step 1: Tokenization - Translating Language into Numbers

LLMs operate purely on numbers. The first step in every prompt is **tokenization**.

A **token** is the basic unit of language processed by the model. Tokens can be:

- Whole words (`hello`)
- Subwords (`run` in `running`)
- Punctuation or symbols

Each token is mapped to a numeric ID.

### Why Subword Tokenization Exists

Early approaches failed:

- **Word-level tokenization** caused unknown-word failures
- **Character-level tokenization** was inefficient and semantically weak

The modern solution is **subword tokenization**, typically implemented using **Byte Pair Encoding (BPE)**.

#### Byte Pair Encoding (BPE)

BPE is a compression algorithm adapted for language:

1. Start with characters as base tokens
2. Iteratively merge the most frequent adjacent character pairs
3. Continue until a fixed vocabulary size is reached

This produces an **open vocabulary**, allowing the model to represent unseen words efficiently.

### Practical Impact

- **You are billed per token**
- Token count defines the **hard context window limit**
- Jargon-heavy language often consumes more tokens
- An LLM has a fixed token vocabulary, but subword encoding lets it represent an open vocabulary by composing unseen words from known pieces.

Here’s a **clean, augmented version** of your section with an explanation of **rows vs. columns** in the embedding matrix, plus a **simple visual diagram** you can drop straight into slides or notes.

## Step 2: Embeddings - Giving Tokens Meaning

Token IDs are just numbers. Meaning comes from embeddings!

Each token is mapped to a vector, a long list of numbers—that represents its meaning. You can think of this vector as coordinates on a large map called the latent space.

These vectors are stored in a table where:

Each row corresponds to a token

Each column represents a learned feature

Tokens with similar meanings end up close together in this space (like apples and bananas), while unrelated ones (like computers) are far apart.

Although we often picture this as a 2D map, LLMs actually use hundreds or thousands of dimensions to capture meaning accurately.

### What the Embedding Matrix Represents

The embedding layer is a matrix(2D array):

```
[rows=vocabulary_size × columns=embedding_dimension]
```

#### Rows → *Tokens*

* **Each row corresponds to one token ID**
* Looking up a token means selecting its row
* Example:

  ```
  token_id = 537  →  embedding_matrix[537]
  ```

#### Columns → *Learned Features*

* Each column represents a **latent feature**
* These features are *not human-labeled*
* During training, columns come to encode things like:

  * syntactic roles
  * semantic traits
  * usage patterns
  * relational structure

A token’s **meaning is distributed across all dimensions**, not stored in any single column.

### Key Properties

* Semantically similar words are close together
* Relationships are encoded geometrically
* Vector arithmetic reflects meaning

Example:

```
king − man + woman ≈ queen
```

This is **not symbolic reasoning** - it’s numerical geometry in the learned vector space.

### Visual Intuition (Embedding Lookup)

```
                Embedding Dimensions →
           d1     d2     d3     d4   ...   d512
         ---------------------------------------
token 0 | 0.12  -0.44   0.88   1.02        ...
token 1 | -0.31  0.91   0.05  -0.77        ...
token 2 | 0.67   0.13  -0.54   0.22        ...
token 3 | ...
  ...
token 537 (king)  →  [ 0.21, -0.93, 0.44, ... ]
```

**Lookup = select a row**
**Meaning = the full vector**

<img width="80%" src="./embeddings.png" alt="Embeddings"/>

## Step 3: Positional Encoding - Restoring Word Order

Transformers process all tokens **in parallel**, which removes sequence order.

**Positional encodings** solve this by adding a position-specific vector to each token embedding.

### Why It Matters

- Enables understanding of word order
- Defines the **maximum context window**
- Beyond this limit, coherence degrades

Your context window is literally how far positional encoding can track relationships.

When an open source model makes their weights public, part of this includes the token embedding matrix we discussed where rows are the token ids columns are the learned dimensions.

## Step 4: The Transformer Block

Modern generative models (GPT-style) use a **decoder-only transformer** composed of stacked transformer blocks.

Each block consists of:

1. Input embeddings
2. Positional encodings
3. **Self-attention**
4. **Feed-forward network**
5. Residual connections & layer normalization



## Self-Attention: Contextual Meaning

Self-attention determines how each word relates to every other word.

Each token produces three vectors:

- **Query (Q)** - what the word is looking for
- **Key (K)** - what the word offers
- **Value (V)** - the information it provides

Relevance is computed using **dot products** between queries and keys, normalized via **softmax**, and applied to values.

### Multi-Head Attention

Rather than one attention pass, models run many in parallel:

- Grammar
- Long-range references
- Sentiment
- Semantic structure

Modern models use dozens or hundreds of attention heads.



## Feed-Forward Networks: Dense Knowledge Storage

After attention, each token passes through a feed-forward network:

- Expands dimensionality (e.g., 512 → 2048)
- Applies non-linear activation (e.g., GELU)
- Contracts back to original size

This layer stores abstract patterns and learned knowledge.



## Scaling Deep: Residuals & Layer Normalization

Stacking many transformer blocks introduces training instability.

Two mechanisms enable depth:

### Residual Connections
- Skip connections allow gradients to flow backward
- Prevent vanishing gradients

### Layer Normalization
- Stabilizes activations within each token
- Enables deep stacking

Together, they allow models to scale to dozens or hundreds of layers.



## Output Layer: Choosing the Next Token

After the final transformer block:

1. A linear layer maps vectors to vocabulary size
2. Outputs **logits** (raw scores)
3. Softmax converts logits into probabilities

This produces a probability distribution over all possible next tokens.



## Inference: Autoregressive Generation

Generation proceeds one token at a time:

1. Entire prompt is processed
2. Only the **last token’s** probability distribution is used
3. Selected token is appended
4. The entire sequence is re-processed

### Implications

- Latency grows linearly with context size
- Long conversations slow responses
- Regenerating answers may differ due to sampling

### Sampling Strategies

- **Greedy**: highest-probability token (deterministic)
- **Temperature**: introduces randomness
- Higher temperature = more creativity, higher hallucination risk



## Training Efficiency: Why Transformers Scaled

Training uses **causal masking** to prevent future token access.

This enables:

- Parallel prediction of thousands of next tokens
- Single backpropagation step per segment
- Massive GPU-level parallelism

This architectural efficiency is what made modern LLMs feasible.



## From Base Models to Instruct Models

### Base Model
- Trained on raw internet text
- Learns grammar and facts
- No instruction following

### Instruct Model
- Fine-tuned on curated prompt-response pairs
- Learns how to behave
- Optimized for user interaction



## Alignment & RLHF

Alignment ensures models are:

- Helpful
- Honest
- Harmless

### Reinforcement Learning from Human Feedback (RLHF)

1. Humans rank model outputs
2. A **reward model** learns preferences
3. The LLM is optimized to maximize reward

This is behavioral conditioning layered atop statistical prediction.



## Hallucinations: A Predictable Failure Mode

Hallucinations arise because:

- The model must always predict a next token
- Uncertainty still forces selection
- Plausibility ≠ factual accuracy

This is not a bug-it’s a consequence of the objective function.



## Retrieval-Augmented Generation (RAG)

RAG grounds outputs in verified data.

### Three Steps

1. **Retrieve** relevant documents via embeddings
2. **Augment** the prompt with retrieved content
3. **Generate** constrained output

### Trade-Offs

- Added latency
- Depends on retrieval quality
- Poor data can cause misinformation

RAG shifts trust from the model to the data pipeline.



## Final Takeaway

LLMs are purely statistical systems predicting the next token.

Yet, when scaled with sufficient data, depth, and architectural design, they produce outputs that resemble reasoning, creativity, and synthesis.

The open question remains:

> Can reasoning emerge purely from correlation at scale?

That question defines the current frontier of AI-and evolves with every token generated.

# References
## Notebook 

[Google colab Notebook](https://colab.research.google.com/drive/15L_FmXiHN_JGUzHGCt2asj2wpxMXi44G?usp=sharing)

## Bias
<iframe width="560" height="315" src="https://www.youtube.com/embed/OhCzX0iLnOc?si=vdqgKJmBWxKH6C89" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

<iframe width="560" height="315" src="https://www.youtube.com/embed/59bMh59JQDo?si=STX4ELtrYCFNTNqm" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## Tokenization 
<iframe width="560" height="315" src="https://www.youtube.com/embed/byajUNOOqNI?si=E8u7Mut05ydY38Gx" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

[BPE vocabulary builder demo](https://www.bpe-visualizer.com/)

## Token Vectors aka Token Embeddings
<iframe width="560" height="315" src="https://www.youtube.com/embed/0TiJ9c9rzZA?si=0zSv1PavXfLn9pjs" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

<iframe width="560" height="315" src="https://www.youtube.com/embed/ISPId9Lhc1g?si=bkpfo6bIvvVB0xf8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
