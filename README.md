# AHPd — Data-Driven Multi-Criteria Decision System

**AHPd** is a **fully objective, multi-criteria decision-making system** built on a modern, data-driven evolution of the classic **Analytic Hierarchy Process (AHP)** method.

Unlike traditional AHP, AHPd eliminates subjective judgment and uses **real, measurable data** to generate consistent, auditable, and mathematically justifiable business decisions.

> 🔗 [PHP Native Extension](./php-extension/README.md)
> 🔗 [REST API](https://ahpbi.wead.tech/api-rest)
> 🔗 CLI (Coming Soon)

## 🚀 The AHPd Advantage

The **AHPd** (AHP Data-Driven) system provides a quantitative framework for comparing alternatives—be it products, projects, suppliers, or strategies—based on their quantitative attributes (price, performance, quality, resource consumption, etc.).

AHPd automatically calculates the **weight and importance of each criterion** by analyzing the **statistical dispersion of the input data**, eliminating the need for human input on criterion priority.

This means your decisions are:

  * **100% Objective:** Criteria weights are mathematically derived from the data itself.
  * **Highly Consistent:** No manual subjectivity or inconsistent pairwise comparisons.
  * **Reproducible:** The same data always yields the same, justifiable result.

## 🎯 Key Strategic Benefits

| Benefit | Description | Value for Decision Makers |
| :--- | :--- | :--- |
| **Objective Decisions** | Decisions are based purely on real-world data, removing human bias and politics from complex choices. | **Mitigate Risk** and ensure regulatory compliance. |
| **Full Explainability** | Every result is detailed with the percentage contribution of each criterion and attribute. | **Justify Investment** and easily audit results. |
| **High Performance** | Implemented with a highly optimized C/Rust core, handling large-scale data quickly. | **Accelerate Time-to-Decision** in real-time systems. |
| **Seamless Integration** | Available as a PHP extension, REST API, and CLI tool. | **Embed Intelligence** directly into existing BI, ERP, or recommendation systems. |

## 🧠 How AHPd Works

AHPd transforms raw data into strategic insight through a simple process:

1.  **Define Preferences:** Specify the criteria and indicate whether you want to **maximize** or **minimize** each one (e.g., "Max Quality," "Min Price").
2.  **Provide Raw Data:** Input the quantitative data for all options being compared. **No data normalization or pre-processing is needed.**
3.  **AHPd Calculates:**
      * Analyzes the **statistical spread** of values across all options.
      * Automatically assigns the **weight of importance** to each criterion.
      * Determines the **relative performance (priority)** of each alternative.
4.  **Audit & Rank:** The output is a **clear, auditable percentage ranking**, showing **which alternative is best and why**.

## 📊 Intuitive Example

| Alternative | Price (Minimize) | Performance (Maximize) | Autonomy (Maximize) |
| :--- | :--- | :--- | :--- |
| Product A | 200 | 70 | 10 |
| Product B | 250 | 90 | 12 |
| Product C | 180 | 60 | 8 |

➡️ **AHPd Ranking:**

  * **Product B** — **36.8%** (Best performance and autonomy)
  * **Product A** — 33.1% (Best price)
  * **Product C** — 30.1% (Intermediate)

> 💡 **AHPd Explanation:** Product B won because the *Performance* criterion showed the greatest difference between candidates, thus gaining the highest automatic weight, overshadowing the contribution of Product C's slightly better price.

### Example visual (with Chart.js)

This simple example demonstrates the decision to purchase a device, comparing the features that the **user considers relevant**.

| Option  | price US$ (min) | storage GB (max) | memory GB (max) | camera Mpx (max) | battery mAh (max) |
|----------|-----------------|------------------|------------------|------------------|-------------------|
| Phone A  | 9494            | 128              | 6                | 48               | 4323              |
| Phone B  | 4139            | 256              | 8                | 50               | 4500              |
| Phone C  | 4429            | 256              | 8                | 50               | 4300              |
| Phone D  | 1885            | 128              | 6                | 64               | 5065              |

Note that the data was passed **without** any transformation, **without** normalization, **exactly as it is in the real world**.

The user only needed to indicate whether a lower "price" is better or a larger "battery" is better.

The screenshot below intuitively shows the results, allowing you to see **precisely how much each feature (criterion)** contributed to the final ranking score. **This visually validates the weights calculated by AHPd**.

![./php-extension/example/print-chart.png](./php-extension/example/print-chart.png)

## 🧾 Practical Use Cases

| Area | Application | Strategic Outcome |
| :--- | :--- | :--- |
| **Finance** | Comparing investments based on return, risk, and liquidity. | Optimized portfolio construction and risk alignment. |
| **IT & Engineering** | Selecting vendors, software architectures, or technologies. | Reduced deployment costs and increased system efficiency. |
| **Operations** | Choosing optimal equipment, routes, or maintenance strategies. | Streamlined efficiency and reduced operational overhead. |
| **Product & Marketing** | Prioritizing features, analyzing competitor products, or setting prices. | Data-driven product roadmaps and competitive advantage. |
| **HR & Procurement** | Evaluating candidate suitability or selecting raw material suppliers. | Consistent, measurable selection criteria. |

## 🧩 Integration Options

AHPd is designed to be platform-agnostic, supporting several integration paths:

| Type | Description | Link |
| :--- | :--- | :--- |
| **PHP Native Extension** | Native C/Rust implementation for maximum performance within PHP systems. | [View PHP Documentation](./php-extension/README.md) |
| **REST API** | JSON-compatible web service for integration with any programming language or BI tool. | [Online Service](https://ahpbi.wead.tech/api-rest) |
| **CLI Application** | Command-line tool for direct use in automated pipelines and scripts. | *(Under Development)* |
| **GUI Application** | Desktop application for end-user analysis and reporting. | *(Planned)* |

## 🔍 Transparency and Auditability

Every decision made by AHPd is transparent. The system provides **detailed percentage contributions**, showing exactly how much each criterion impacted the final result.

This allows for decisions that are not only efficient but also fully **reliable, accountable, and justifiable** to stakeholders.

**Example of Interpretive Output:**

```
Product B — 36.8% (Winner)
  ↳ Autonomy (36.9% contribution)
  ↳ Performance (37.8% contribution)
  ↳ Price (25.3% contribution)
```

## 📚 Core Concepts: AHPd vs. Traditional AHP

The table below summarizes the key differences that make AHPd the ideal choice for automated, data-driven decision systems, in contrast to the manual approach of classical AHP.

| Feature | AHPd (Data-Driven Evolution) | Traditional AHP (Classic Method) |
| :--- | :--- | :--- |
| **Input Source** | **Real, Quantitative Data** (e.g., price, speed, capacity) | **Subjective Judgments** (Expert opinions, verbal comparisons) |
| **Criterion Weighting** | **Automatic.** Weights are mathematically derived from the data's statistical dispersion. | **Manual.** Weights are derived from subjective **pairwise comparisons** of criteria importance. |
| **Decision Speed** | **High-Speed** (Designed for automated systems and high-volume analysis). | **Slow/Time-Consuming** (Requires collecting, validating, and inputting expert opinions). |
| **Objectivity** | **Fully Objective.** The model results are consistent and reproducible given the same data. | **Subjective/Semi-Objective.** Results depend on the initial consistency and bias of human judges. |
| **Primary Goal** | Multi-criteria **Optimization** and **Auditable Ranking** based on performance. | Multi-criteria **Prioritization** based on perceived importance. |
| **Output** | Clear **Percentage Ranking** + Detailed **Contribution Reports** per criterion. | Priority Vector (Raw Weights) + Consistency Ratio (CR). |

## 🧬 Licensing & Availability

The **use** and **distribution** of the AHPd system are free for both personal and commercial purposes. Compiled binaries, extensions, and packaged libraries may be integrated into third-party products or services without additional licensing fees.

However, the high-performance computational core and underlying source code remain the **exclusive intellectual property of Wead Technology®**, ensuring integrity, consistency, and continuous innovation.

### Required Attribution

For the use of AHPd, **mandatory attribution** to Wead Technology® must be included in your documentation, "About" section, or any licensing notices related to the product that integrates it.

### Enterprise Services

Enterprise-grade services — including **dedicated technical support**, **OEM integration**, **private cloud APIs**, and **performance optimization** — are available for organizations seeking enhanced scalability, reliability, and assistance.

For partnerships, large-scale deployments, or OEM licensing, contact Wead Technology® to discuss collaboration opportunities.