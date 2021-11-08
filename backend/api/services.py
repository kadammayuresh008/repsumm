from pdfminer.converter import PDFPageAggregator
from pdfminer.layout import LAParams, LTFigure, LTTextBox
from pdfminer.pdfdocument import PDFDocument
from pdfminer.pdfinterp import PDFPageInterpreter, PDFResourceManager
from pdfminer.pdfpage import PDFPage, PDFTextExtractionNotAllowed
from pdfminer.pdfparser import PDFParser
import os
from django.conf import settings
from .config import *

def extract_text(path_of_file):
	txt = ""
	path = MEDIA_FILE_LOCAL_URL + path_of_file
	with open(path, 'rb') as f:
		parser = PDFParser(f)
		doc = PDFDocument(parser)
		pages = list(PDFPage.create_pages(doc))

		for page in pages:
			rsrcmgr = PDFResourceManager()
			device = PDFPageAggregator(rsrcmgr, laparams=LAParams())
			interpreter = PDFPageInterpreter(rsrcmgr, device)
			interpreter.process_page(page)
			layout = device.get_result()
		
			# print(layout)
			for obj in layout:
				if isinstance(obj, LTTextBox):
					txt += obj.get_text()
					
				# elif isinstance(obj, LTFigure):
				#     stack += list(obj)
			txt += "\n"
	print(txt[0:40])
	return txt