$(document).ready(function(){$.validator.unobtrusive.adapters.add("equaltovalue",["value"],function(n){n.rules.equaltovalue=n.params;n.message!=null&&(n.messages.equaltovalue=n.message)});$.validator.addMethod("equaltovalue",function(n,t,i){return $(t).is(":checkbox")?$(t).is(":checked")?n&&n.toLowerCase()==="true":n&&n.toLowerCase()==="false":n&&i.value.toLowerCase()===n.toLowerCase()});$.validator.unobtrusive.adapters.add("greaterthan",["value"],function(n){n.rules.greaterthan=n.params;n.message!=null&&(n.messages.greaterthan=n.message)});$.validator.addMethod("greaterthan",function(n,t,i){return n&&n>i.value});$.validator.unobtrusive.adapters.add("greaterthanorequal",["value"],function(n){n.rules.greaterthanorequal=n.params;n.message!=null&&(n.messages.greaterthanorequal=n.message)});$.validator.addMethod("greaterthanorequal",function(n,t,i){return n&&n>=i.value});$.validator.unobtrusive.adapters.add("lessthan",["value","input"],function(n){n.rules.lessthan=n.params;n.message!=null&&(n.messages.lessthan=n.message)});$.validator.addMethod("lessthan",function(n,t,i){return i.value&&i.input!=""?n&&n<$("#"+i.input).val():n&&n<i.value});$.validator.addMethod("notequalto",function(n,t,i){return this.optional(t)?!0:$(i).val()!=n});$.validator.unobtrusive.adapters.add("notequalto",["other"],function(n){function t(n){return n.substr(0,n.lastIndexOf(".")+1)}function i(n,t){return n.indexOf("*.")===0&&(n=n.replace("*.",t)),n}var r=t(n.element.name),u=n.params.other,f=i(u,r),e=$(n.form).find(":input[name="+f+"]")[0];n.rules.notequalto=e;n.message&&(n.messages.notequalto=n.message)});$.validator.unobtrusive.adapters.add("reqwhen",["prop","value"],function(n){function t(n){return n.substr(0,n.lastIndexOf(".")+1)}function i(n,t){return n.indexOf("*.")===0&&(n=n.replace("*.",t)),n}var r=t(n.element.name),u=n.params.prop,f=i(u,r),e=$(n.form).find(":input[name='"+f+"']")[0];n.params.prop=e;n.rules.reqwhen=n.params;n.message!=null&&(n.messages.reqwhen=n.message||"ادخل/اختر قيمة لهذا الحقل")});$.validator.addMethod("reqwhen",function(n,t,i){var s=$(t),r=i.prop,o;if(r){var u=r.value,f=s.data("val-reqwhen-value"),e=!!n;return f.length?(o=f.indexOf(u)>=0,o?e:!0):u?e:!0}return!0})});