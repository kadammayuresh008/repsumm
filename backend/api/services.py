from pdfminer.converter import PDFPageAggregator
from pdfminer.layout import LAParams, LTFigure, LTTextBox, LTChar, LTTextContainer
from pdfminer.pdfdocument import PDFDocument
from pdfminer.pdfinterp import PDFPageInterpreter, PDFResourceManager
from pdfminer.pdfpage import PDFPage, PDFTextExtractionNotAllowed
from pdfminer.pdfparser import PDFParser
from pdfminer.layout import LTAnno, LTFigure, LTTextBox, LTChar, LTTextContainer
import os
from django.conf import settings
from .config import *
import json




# def extract_text(path_of_file):
# 	txt = ""
# 	path = MEDIA_FILE_LOCAL_URL + path_of_file
# 	with open(path, 'rb') as f:
# 		parser = PDFParser(f)
# 		doc = PDFDocument(parser)
# 		pages = list(PDFPage.create_pages(doc))

# 		for page in pages:
# 			rsrcmgr = PDFResourceManager()
# 			device = PDFPageAggregator(rsrcmgr, laparams=LAParams())
# 			interpreter = PDFPageInterpreter(rsrcmgr, device)
# 			interpreter.process_page(page)
# 			layout = device.get_result()
		
# 			# print(layout)
# 			for obj in layout:
# 				if isinstance(obj, LTTextBox):
# 					txt += obj.get_text()
					
# 				# elif isinstance(obj, LTFigure):
# 				#     stack += list(obj)
# 			txt += "\n"
# 	print(txt[0:40])
# 	return txt


# '''
# function for extracting section-wise text extraction
# '''
# def extract_sectionwise_text(path_of_file):
# 	path = MEDIA_FILE_LOCAL_URL + path_of_file
# 	paper_content = {}
# 	text = ""
# 	heading = ""
# 	abstract = ""
# 	count = 0
# 	is_abstract = 0

# 	with open(path, 'rb') as f:
# 		parser = PDFParser(f)
# 		doc = PDFDocument(parser)
# 		pages = list(PDFPage.create_pages(doc))
# 		# pages = pages[:1]
# 		for page in pages:
# 			rsrcmgr = PDFResourceManager()
# 			device = PDFPageAggregator(rsrcmgr, laparams=LAParams())
# 			interpreter = PDFPageInterpreter(rsrcmgr, device)
# 			interpreter.process_page(page)
# 			layout = device.get_result()

# 			for obj in layout:
# 				if isinstance(obj, LTTextBox):
# 					text += obj.get_text()
# 			text += "\n"
			
# 			for textbox_element in layout:
# 				if isinstance(textbox_element, LTTextBox):
# 					for line in textbox_element:
# 						for char in line:
							
# 							# print(char)
# 							if not isinstance(char, LTAnno):
# 							# print(char)

# 								if char.size > 18:
# 									heading += char.get_text()
							
# 								if 'Medi' in char.fontname and 'MediItal' not in char.fontname:

# 									if is_abstract==0:
# 										is_abstract+=1
# 										abstract += char.get_text()
# 									elif(is_abstract==1):
# 										abstract += char.get_text()

# 								elif 'Bold' in char.fontname and 'BoldItalic' not in char.fontname:

# 									if is_abstract==0:
# 										is_abstract+=1
# 										abstract += char.get_text()
# 									elif(is_abstract==1):
# 										abstract += char.get_text()

# 								# else:
# 								#   if(is_abstract==1):
# 								#     is_abstract+=1

# 							else:
# 								if(is_abstract==1):
# 									abstract += char.get_text()
# 	abstract = abstract.replace("\n","").strip()
# 	paper_content['heading'] = heading  
# 	paper_content['abstract'] = abstract                                                   

# 	words = []
# 	str1 = ""
# 	for i in text:
# 		if i == "\n":
# 			words.append(str1)
# 			str1 = ""
# 		else:
# 			str1 += i
# 		# print(i)


# 	content_heading = []
# 	for i in range(len(words)):
# 		# print(words[i])
# 		if words[i].isupper():
# 			content_heading.append(words[i])


# 	import re
# 	def ValidationOfRomanNumerals(string):
# 		return (bool(re.search(r"^M{0,3}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$",string)))

# 	main_headings = []
# 	for i in range(len(content_heading)):
# 		li = content_heading[i].split(' ')
# 		if ValidationOfRomanNumerals(li[0][:-1]):
# 			txt = ' '.join(li[1:])
# 			txt = txt.lstrip()
# 			if txt != "" and len(txt) > 2:
# 				main_headings.append(txt.rstrip())


# 	text2 = text



# 	text2 = text2.split(main_headings[0])[1]
# 	for i in range(1,len(main_headings)):
# 		paper_content[main_headings[i-1]] = text2.split(main_headings[i])[0]
# 		text2 = text2.split(main_headings[i])[1]
# 	paper_content['CONCLUSION'] = text2.split('[1]')[0]

# 	return paper_content

