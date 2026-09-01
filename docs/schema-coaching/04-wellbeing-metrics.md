# 04 - Wellbeing Metrics: The Evidence Base

Why the schema tracks what it tracks. This file justifies the user-relevant metrics stored on exercise sessions and the research profile fields. If you are tempted to add, rename, or remove a metric column, read this first and record your reasoning in the decision log.

## The problem with "mood"

"Track the user's mood" sounds reasonable and is ambiguous. Single-item mood ratings are psychometrically weak: what a user means by "mood" shifts between sessions and between users, and retrospective mood recall is systematically distorted. For a PTSD support app, the scientific literature points to more specific, better-validated momentary measures. We track what the evidence supports, and we store raw metrics only - never user-facing trend graphs (see below).

## What we track on an exercise session

### 1. Distress before and after (0-10) - the primary metric

The Subjective Units of Distress Scale (SUDS) is the established momentary distress measure in the PTSD treatment literature. Originating in Wolpe's behaviour therapy practice, it is a single self-rating of current distress intensity, typically 0-100 (we use 0-10 for the app). It is the standard pre/post measure in exposure-based and EMDR protocols, which is exactly the shape of our guided exercises: rate before, do the exercise, rate after.

Recent validity work on the SUDS (Mattera and Zaboski, 2025) supports its continued clinical utility while calling for more intensive longitudinal validation - precisely the kind of data a session-anchored app can contribute. That is our research rationale for collecting it.

### 2. Helpfulness (0-10, after only) - the intervention-response metric

A single post-exercise item ("how much did this help right now?") captures immediate intervention response for grounding and self-soothing exercises. It is the metric that tells us which workbook exercises work in situ, which is the research question the app is positioned to answer.

### 3. Why momentary, in-app ratings and not recall

Ecological momentary assessment (EMA) research shows that in-situ momentary ratings capture PTSD symptoms more accurately than retrospective self-report. Schuler et al. (2021) demonstrated material divergence between momentary EMA ratings and retrospective reports of the same period in a trauma-exposed sample; Lane, Waters and Black (2019) review the EMA methodology applied to PTSD symptoms and co-occurring behaviours. The app's session-anchored ratings ARE an EMA design - that is a strength, not an accident.

### 4. What we deliberately do NOT track

- Mood trend graphs and dashboards. Clinical guidance and the EMA literature warn that confronting users with visualised trends of their own distress can increase rumination and distress in vulnerable populations. Wellbeing metrics are stored raw for research; they are never aggregated into a user-facing trend view. This is story S26.
- Long-form instruments (e.g. PANAS, PCL-5, PHQ-9) in-session. These are validated and useful in research, but they are too heavy for a self-help app's exercise flow. The 0-10 ratings are the EMA-compatible lightweight choice. (PANAS: Watson, Clark and Tellegen, 1988.)

## What we track on the user profile (research fields)

Age band (not exact age - exact age is PII-adjacent), gender, ethnicity (ONS categories), treatment status (optional), referral source (optional). All optional, all with prefer-not-to-say. These are the demographic covariates a PTSD-adjacent research analysis needs. Identity fields (email, display name) live separately and are NEVER included in research exports (story S27).

## References

1. Wolpe, J. (1969) The Practice of Behavior Therapy. New York: Pergamon Press. (Origin of the SUDS scale; APA PsycTests entry: Subjective Units of Distress Scale, doi: 10.1037/t05183-000.)
2. Mattera, E. and Zaboski, B. (2025) 'Rethinking the Subjective Units of Distress Scale: Validity and clinical utility of the SUDS', Clinics and Practice, 15(7), 123. doi: 10.3390/clinpract15070123.
3. Schuler, K., Ruggero, C.J., Mahaffey, B., Gonzalez, A., Callahan, J.L., Boals, A., Waszczuk, M.A., Luft, B.J. and Kotov, R. (2021) 'When hindsight is not 20/20: Ecological momentary assessment of PTSD symptoms versus retrospective report', Assessment, 28(1), pp. 238-247. doi: 10.1177/1073191119869826.
4. Lane, A.R., Waters, A.J. and Black, A.C. (2019) 'Ecological momentary assessment studies of comorbid PTSD and alcohol use: A narrative review', Addictive Behaviors Reports, 10, 100205. doi: 10.1016/j.abrep.2019.100205.
5. Shiffman, S., Stone, A.A. and Hufford, M.R. (2008) 'Ecological momentary assessment', Annual Review of Clinical Psychology, 4, pp. 1-32. doi: 10.1146/annurev.clinpsy.3.022806.091415.
6. Russell, J.A. (1980) 'A circumplex model of affect', Journal of Personality and Social Psychology, 39(6), pp. 1161-1178. doi: 10.1037/h0077714. (Valence/arousal structure; the optional second dimension if ever needed.)
7. Watson, D., Clark, L.A. and Tellegen, A. (1988) 'Development and validation of brief measures of positive and negative affect: The PANAS scales', Journal of Personality and Social Psychology, 54(6), pp. 1063-1070. doi: 10.1037/0022-3514.54.6.1063. (The longer-form instrument we deliberately do not use in-session.)

Verification note: citations 2, 3 and 4 were verified against publisher records on 25 August 2026. Citation 1 is the classic text; 5-7 are standard methodological references.
