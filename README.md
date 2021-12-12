SMS Police Taiwan
=================

https://mlouielu.github.io/smspolicetaiwan/


Open Data
=========

* 單點坐標回傳行政區: https://data.gov.tw/dataset/101898
* 110聽語障人士簡訊及傳真報案專線: https://data.gov.tw/dataset/7916
  - to dict `cat 110_data | sed 's/  */ /g' | sed 's/-//g' | awk -F, 'BEGIN {FS="\t"; OFS=","} {print "\""substr($1,0, 3)"\":\""$2"\","}'`
  - to option `cat 110_data | sed 's/  */ /g' | sed 's/-//g' | awk -F, 'BEGIN {FS="\t"; OFS=","} {print "<option value=\""$2"\">"substr($1,0, 3)" @ "$2"</option>"}'`
`

