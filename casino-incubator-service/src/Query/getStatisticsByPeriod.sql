SELECT 
    CAST(DATE(DATE_ADD(r.TimeRated, INTERVAL @tzOffset HOUR)) AS CHAR) AS Date,
    r.EmotionId,
    e.Name,
    COUNT(r.EmotionId) AS EmotionsCounts
FROM
    Ratings r 
INNER JOIN 
    Emotions e
ON  
    r.EmotionId = e.EmotionId
WHERE 
    DATE(DATE_ADD(r.TimeRated, INTERVAL @tzOffset HOUR)) BETWEEN @dateFrom AND @dateTo
GROUP BY 
    CAST(DATE(DATE_ADD(r.TimeRated, INTERVAL @tzOffset HOUR)) AS CHAR),
    r.EmotionId,
    e.Name
ORDER BY 
    r.TimeRated
