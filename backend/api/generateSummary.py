# -*- coding: utf-8 -*-
"""Copy of IEEE_Springer_Format_Headings_Content

Automatically generated by Colaboratory.

Original file is located at
    https://colab.research.google.com/drive/1vUDLuIeP1d_svfMN8TAcRY85kbxrXGc0

# Installation of required packages
"""

# pip install pytesseract

"""**Pdfminer** is a tool for extracting information from PDF documents and focuses on getting and analyzing text data. Some of the features includes: getting the exact location, font or color of the text."""

# !pip install pdfminer.six

"""## Importing required libraries and modules"""

# from .serializers import processImageSerializer
from pdfminer.converter import PDFPageAggregator
from pdfminer.layout import LAParams, LTFigure, LTTextBox, LTChar, LTTextContainer
from pdfminer.pdfdocument import PDFDocument
from pdfminer.pdfinterp import PDFPageInterpreter, PDFResourceManager
from pdfminer.pdfpage import PDFPage, PDFTextExtractionNotAllowed
from pdfminer.pdfparser import PDFParser
from .config import *
from .models import ProcessImage


import io
from PIL import Image

from os.path import basename
from django.core.files import File

"""# Research Paper Summarization

## Selecting Research Paper to summarize
"""

# paperName = "paper_17.pdf"
# path = "/content/" + paperName

def get_section_summary(path_of_file):
  path = MEDIA_FILE_LOCAL_URL + path_of_file
  # print(path)

  """## Structure and Content Extraction

  ---
  *   Extracting Title of the paper
  *   Extracting Abstract of the paper
  *   Extracting and filtering out the headings of all the sections
  *   Extracting the content of all the headings

  ### Extracting the entire text
  """

  paper_content = {}
  text = ""
  heading = ""
  abstract = ""
  count = 0
  is_abstract = 0
  from pdfminer.layout import LTAnno, LTFigure, LTTextBox, LTChar, LTTextContainer

  with open(path, 'rb') as f:
      prev=""
      prev2 = None
      prev3 = None

      parser = PDFParser(f)
      doc = PDFDocument(parser)
      pages = list(PDFPage.create_pages(doc))
      # pages = pages[0:1]
      for page in pages:
        # abstract += "$$$$$$"
        rsrcmgr = PDFResourceManager()
        device = PDFPageAggregator(rsrcmgr, laparams=LAParams())
        interpreter = PDFPageInterpreter(rsrcmgr, device)
        interpreter.process_page(page)
        layout = device.get_result()

        for obj in layout:
            if isinstance(obj, LTTextBox):
                text += obj.get_text()
        text += "\n"
        
        for textbox_element in layout:
                  if isinstance(textbox_element, LTTextBox):
                      for line in textbox_element:
                          for char in line:
                              if not isinstance(char, LTAnno):
                                if char.size > 15:  
                                  heading += char.get_text()
                                if 'Medi' in char.fontname and 'MediItal' not in char.fontname:
                                  if is_abstract==0:
                                    is_abstract+=1
                                    abstract += char.get_text()
                                  elif(is_abstract==1):
                                    abstract += char.get_text()
                                elif 'Bold' in char.fontname and 'BoldItalic' not in char.fontname:
                                  if is_abstract==0:
                                    if(prev=="\n" and prev2 == " " and prev3 == '.'):
                                        abstract+="######"
                                    is_abstract+=1
                                    abstract += char.get_text()
                                  elif(is_abstract==1):
                                    if(prev=="\n" and prev2 == " " and prev3 == '.'):
                                        abstract+="######"
                                    abstract += char.get_text()

                                else:
                                  
                                  if (prev == "\n"):
                                    abstract += "@@"

                              else:

                                heading += " "

                                if(is_abstract==1):
                                    abstract += char.get_text()
                              prev3 = prev2
                              prev2 = prev
                              prev=char.get_text()
                              # heading += " "
  abstract = abstract.replace("\n","").strip()
  paper_content['heading'] = heading.strip()
  bold_words = abstract

  """### Extracting the headings of all the sections"""

  # Function to extract Springer Headings
  import re
  new1 = re.sub('@+', ' ', abstract)
  new1 = re.sub('   +', '@', new1)
  li = new1.split('######')
  isIEEEHeadings = False
  li2 = []
  for i in li:
    if '@' in i:
      li2 += i.split('@')
    else:
      li2.append(i)

  li3 = []
  for i in li2:
    a = re.findall(r" \d+[.]*[ ]+[A-Z]{1}[\w+(\-\w+)+ ]*",i)
    if(a != []):
      li3.append(a[0].strip())
  li2 += li3

  def checkInteger(text):
    ans = text.split(' ')
    try:
      if ans[0][-1] == ".":
        ans[0] = ans[0][:-1]
    except:
      IndexError
      

    try:
      x = int(ans[0])
      return True
    except:
      ValueError
    else:
      return False
      
  main_headings = []
  for i in li2:
    if bool(re.search(r"^\d[.]*[ ]+[A-Z]{1}[\w+(\-\w+)+ ]*",i)):
      if checkInteger(i):
            main_headings.append(i.rstrip())

  final_headings = []
  isTrue = True
  for i in main_headings:
    try:
      first = i.split(". ")[0]
      
    except:
      isTrue = False
      ValueError
    finally:
      if isTrue:
        first = i.split(" ")[0]
      
    if first[-1] == '.':
      first = first[:-1]
    if first + ".1" in i:
      final_headings.append(i.split(first + ".1")[0])
    else:
      final_headings.append(i)

  # Function to extract IEEE Headings
  def ValidationOfRomanNumerals(string):
      return (bool(re.search(r"^M{0,3}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$",string)))

  def IEEE_Headings(text):
    words = []
    str1 = ""
    for i in text:
      if i == "\n":
        words.append(str1)
        str1 = ""
      else:
        str1 += i


    content_heading = []
    for i in range(len(words)):
      # print(words[i])
      if words[i].isupper():
        content_heading.append(words[i])  

    main_headings = []
    for i in range(len(content_heading)):
      li = content_heading[i].split(' ')
      if ValidationOfRomanNumerals(li[0][:-1]):
        txt = ' '.join(li[1:])
        txt = txt.lstrip()
        if txt != "" and len(txt) > 2:
          main_headings.append(txt.rstrip())

    return main_headings

  if len(final_headings) == 0:
    isIEEEHeadings = True
    final_headings = IEEE_Headings(text)

  # Displaying the final headings
  for i in final_headings:
    print(i)

  """### OCR Implementation"""

  import os
  import shutil
  os.mkdir('media\processImages')

  # pip install PyMuPDF

  # !sudo apt install tesseract-ocr

  # pip install pdf2image

  # !sudo apt install poppler-utils

  from pdf2image import convert_from_path
  papername=path_of_file.split("rps/")[1]
  pages = convert_from_path(MEDIA_FILE_LOCAL_URL+"\media\\rps\\"+papername,fmt='jpeg',poppler_path=r'C:\poppler-0.68.0\bin')
  i=0
  for page in pages:
    page.save(MEDIA_PROCESS_IMAGE_FILE_LOCAL_URL+'\out2'+str(i)+'.jpg')
    i=i+1
  

  try:
      from PIL import Image
  except ImportError:
      import Image
  import pytesseract


  def multi(img,text):
    perPageText=pytesseract.image_to_string(img)
    text[0] +=perPageText

  # Commented out IPython magic to ensure Python compatibility.
  # %matplotlib inline
  import cv2
  from matplotlib import pyplot as plt
  i=0
  for page in pages:
      img = cv2.imread(MEDIA_PROCESS_IMAGE_FILE_LOCAL_URL+'/out2'+str(i)+'.jpg')
      shape = img.shape
      # for springer
      if isIEEEHeadings==False:
        crop_img = img[int(shape[0]*0.1):int(shape[0]*0.92), 0:shape[1]]
      else:
        # for IEEE
        crop_img = img[int(shape[0]*0.05):int(shape[0]*0.92), 0:shape[1]]
      cv2.imwrite(MEDIA_PROCESS_IMAGE_FILE_LOCAL_URL+'/out2'+str(i)+'.jpg', crop_img)
      i=i+1

  import numpy as np
  import threading
  task1=[]

  text=[""]
  for i in range(len(pages)):
    filename = MEDIA_PROCESS_IMAGE_FILE_LOCAL_URL+'/out2'+str(i)+'.jpg'
    img1 = np.array(Image.open(filename))
    df=threading.Thread(target= multi(img1,text), name='t'+str(i))
    task1.append(df)
  shutil.rmtree(MEDIA_PROCESS_IMAGE_FILE_LOCAL_URL)

  for i in task1:
    i.start()
  for i in task1:
    i.join()

  # Text extracted
  # print(text[0])
  # print("#####################################################################################################")

  # """### Extracting the content of all the headings"""

  text2 = text[0]

  # print(text2)

 

  text2 = text2.split(final_headings[0])[1]
  for i in range(1,len(final_headings)):
    paper_content[final_headings[i-1]] = text2.split(final_headings[i])[0].replace("\n"," ")
    text2 = text2.split(final_headings[i])[1]

    lastKey = final_headings[-1]

  if "ACKNOWLEDGMENT" in text2:
    paper_content['CONCLUSION'] = text2.split("ACKNOWLEDGMENT")[0].replace("\n"," ")
  elif "REFERENCES" in text2:
    paper_content['CONCLUSION'] = text2.split("REFERENCES")[0].replace("\n"," ")


  if "Acknowledgement" in text2:
    paper_content[lastKey] = text2.split("Acknowledgement")[0].replace("\n"," ")

  elif "Acknowledgements" in text2:
    paper_content[lastKey] = text2.split("Acknowledgements")[0].replace("\n"," ")

  elif "References" in text2:
    paper_content[lastKey] = text2.split("References")[0].replace("\n"," ")



  """## Displaying the content for all the sections


  # <!-- *   Title
  # *   Abstract
  # *   Introduction
  # *   Results
  # *   Conclusion -->


  # """


  """## Summary Generation"""

  for i in final_headings:
    print("\n\n",i)
    print(paper_content[i])



  """### Pre-processing"""

  import re
  from string import punctuation
  import nltk
  from nltk.sentiment.vader import SentimentIntensityAnalyzer
  nltk.download('vader_lexicon')

  def tokenize_sentence(sentence_list):
    tokenized = []
    for i in range(len(sentence_list)):
      tokenized.append(sentence_list[i].split())
    return tokenized

  def remove_stopwords(tokenized_list):
    stopwords = ["'d", "'ll", "'m", "'re", "'s", "'ve", 'I', 'a', "a's", 'able', 'about', 'above', 'abroad', 'abst', 'accordance', 'according', 'accordingly', 'across', 'act', 'actually', 'added', 'adj', 'adopted', 'affected', 'affecting', 'affects', 'after', 'afterwards', 'again', 'against', 'ago', 'ah', 'ahead', 'ain', "ain't", 'all', 'allow', 'allows', 'almost', 'alone', 'along', 'alongside', 'already', 'also', 'although', 'always', 'am', 'amid', 'amidst', 'among', 'amongst', 'amoungst', 'amount', 'an', 'and', 'announce', 'another', 'any', 'anybody', 'anyhow', 'anymore', 'anyone', 'anything', 'anyway', 'anyways', 'anywhere', 'apart', 'apparently', 'appear', 'appreciate', 'appropriate', 'approximately', 'are', 'aren', "aren't", 'arent', 'arise', 'around', 'as', 'aside', 'ask', 'asking', 'associated', 'at', 'auth', 'available', 'away', 'awfully', 'b', 'back', 'backward', 'backwards', 'be', 'became', 'because', 'become', 'becomes', 'becoming', 'been', 'before', 'beforehand', 'begin', 'beginning', 'beginnings', 'begins', 'behind', 'being', 'believe', 'below', 'beside', 'besides', 'best', 'better', 'between', 'beyond', 'bill', 'biol', 'both', 'bottom', 'brief', 'briefly', 'but', 'by', 'c', "c'mon", "c's", 'ca', 'call', 'came', 'can', "can't", 'cannot', 'cant', 'caption', 'cause', 'causes', 'certain', 'certainly', 'changes', 'clearly', 'co', 'co.', 'com', 'come', 'comes', 'computer', 'con', 'concerning', 'consequently', 'consider', 'considering', 'contain', 'containing', 'contains', 'corresponding', 'could', 'couldn', "couldn't", 'couldnt', 'course', 'cry', 'currently', 'd', 'dare', "daren't", 'date', 'de', 'definitely', 'describe', 'described', 'despite', 'detail', 'did', 'didn', "didn't", 'different', 'directly', 'do', 'does', 'doesn', "doesn't", 'doing', 'don', "don't", 'done', 'down', 'downwards', 'due', 'during', 'e', 'each', 'ed', 'edu', 'effect', 'eg', 'eight', 'eighty', 'either', 'eleven', 'else', 'elsewhere', 'empty', 'end', 'ending', 'enough', 'entirely', 'especially', 'et', 'et-al', 'etc', 'even', 'ever', 'evermore', 'every', 'everybody', 'everyone', 'everything', 'everywhere', 'ex', 'exactly', 'example', 'except', 'f', 'fairly', 'far', 'farther', 'few', 'fewer', 'ff', 'fifteen', 'fifth', 'fifty', 'fill', 'find', 'fire', 'first', 'five', 'fix', 'followed', 'following', 'follows', 'for', 'forever', 'former', 'formerly', 'forth', 'forty', 'forward', 'found', 'four', 'from', 'front', 'full', 'further', 'furthermore', 'g', 'gave', 'get', 'gets', 'getting', 'give', 'given', 'gives', 'giving', 'go', 'goes', 'going', 'gone', 'got', 'gotten', 'greetings', 'h', 'had', 'hadn', "hadn't", 'half', 'happens', 'hardly', 'has', 'hasn', "hasn't", 'hasnt', 'have', 'haven', "haven't", 'having', 'he', "he'd", "he'll", "he's", 'hello', 'help', 'hence', 'her', 'here', "here's", 'hereafter', 'hereby', 'herein', 'heres', 'hereupon', 'hers', 'herse', 'herself', 'hes', 'hi', 'hid', 'him', 'himse', 'himself', 'his', 'hither', 'home', 'hopefully', 'how', "how's", 'howbeit', 'however', 'hundred', 'i', "i'd", "i'll", "i'm", "i've", 'id', 'ie', 'if', 'ignored', 'im', 'immediate', 'immediately', 'importance', 'important', 'in', 'inasmuch', 'inc', 'inc.', 'indeed', 'index', 'indicate', 'indicated', 'indicates', 'information', 'inner', 'inside', 'insofar', 'instead', 'interest', 'into', 'invention', 'inward', 'is', 'isn', "isn't", 'it', "it'd", "it'll", "it's", 'itd', 'its', 'itself', 'itse”', 'j', 'just', 'k', 'keep', 'keeps', 'kept', 'keys', 'kg', 'km', 'know', 'known', 'knows', 'l', 'largely', 'last', 'lately', 'later', 'latter', 'latterly', 'least', 'less', 'lest', 'let', "let's", 'lets', 'like', 'liked', 'likely', 'likewise', 'line', 'little', 'll', 'look', 'looking', 'looks', 'low', 'lower', 'ltd', 'm', 'ma', 'made', 'mainly', 'make', 'makes', 'many', 'may', 'maybe', "mayn't", 'me', 'mean', 'means', 'meantime', 'meanwhile', 'merely', 'mg', 'might', 'mightn', "mightn't", 'mill', 'million', 'mine', 'minus', 'miss', 'ml', 'more', 'moreover', 'most', 'mostly', 'move', 'mr', 'mrs', 'much', 'mug', 'must', 'mustn', "mustn't", 'my', 'myself', 'myse”', 'n', "n't", 'na', 'name', 'namely', 'nay', 'nd', 'near', 'nearly', 'necessarily', 'necessary', 'need', 'needn', "needn't", 'needs', 'neither', 'never', 'neverf', 'neverless', 'nevertheless', 'new', 'next', 'nine', 'ninety', 'no', 'no-one', 'nobody', 'non', 'none', 'nonetheless', 'noone', 'nor', 'normally', 'nos', 'not', 'noted', 'nothing', 'notwithstanding', 'novel', 'now', 'nowhere', 'n‘t', 'n’t', 'o', 'obtain', 'obtained', 'obviously', 'of', 'off', 'often', 'oh', 'ok', 'okay', 'old', 'omitted', 'on', 'once', 'one', "one's", 'ones', 'only', 'onto', 'opposite', 'or', 'ord', 'other', 'others', 'otherwise', 'ought', "oughtn't", 'our', 'ours', 'ourselves', 'out', 'outside', 'over', 'overall', 'owing', 'own', 'p', 'page', 'pages', 'part', 'particular', 'particularly', 'past', 'per', 'perhaps', 'placed', 'please', 'plus', 'poorly', 'possible', 'possibly', 'potentially', 'pp', 'predominantly', 'present', 'presumably', 'previously', 'primarily', 'probably', 'promptly', 'proud', 'provided', 'provides', 'put', 'q', 'que', 'quickly', 'quite', 'qv', 'r', 'ran', 'rather', 'rd', 're', 'readily', 'really', 'reasonably', 'recent', 'recently', 'ref', 'refs', 'regarding', 'regardless', 'regards', 'related', 'relatively', 'research', 'respectively', 'resulted', 'resulting', 'results', 'right', 'round', 'run', 's', 'said', 'same', 'saw', 'say', 'saying', 'says', 'sec', 'second', 'secondly', 'section', 'see', 'seeing', 'seem', 'seemed', 'seeming', 'seems', 'seen', 'self', 'selves', 'sensible', 'sent', 'serious', 'seriously', 'seven', 'several', 'shall', 'shan', "shan't", 'she', "she'd", "she'll", "she's", 'shed', 'shes', 'should', "should've", 'shouldn', "shouldn't", 'show', 'showed', 'shown', 'showns', 'shows', 'side', 'significant', 'significantly', 'similar', 'similarly', 'since', 'sincere', 'six', 'sixty', 'slightly', 'so', 'some', 'somebody', 'someday', 'somehow', 'someone', 'somethan', 'something', 'sometime', 'sometimes', 'somewhat', 'somewhere', 'soon', 'sorry', 'specifically', 'specified', 'specify', 'specifying', 'state', 'states', 'still', 'stop', 'strongly', 'sub', 'substantially', 'successfully', 'such', 'sufficiently', 'suggest', 'sup', 'sure', 'system', 't', "t's", 'take', 'taken', 'taking', 'tell', 'ten', 'tends', 'th', 'than', 'thank', 'thanks', 'thanx', 'that', "that'll", "that's", "that've", 'thats', 'the', 'their', 'theirs', 'them', 'themselves', 'then', 'thence', 'there', "there'd", "there'll", "there're", "there's", "there've", 'thereafter', 'thereby', 'thered', 'therefore', 'therein', 'thereof', 'therere', 'theres', 'thereto', 'thereupon', 'these', 'they', "they'd", "they'll", "they're", "they've", 'theyd', 'theyre', 'thick', 'thin', 'thing', 'things', 'think', 'third', 'thirty', 'this', 'thorough', 'thoroughly', 'those', 'thou', 'though', 'thoughh', 'thousand', 'three', 'throug', 'through', 'throughout', 'thru', 'thus', 'til', 'till', 'tip', 'to', 'together', 'too', 'took', 'top', 'toward', 'towards', 'tried', 'tries', 'truly', 'try', 'trying', 'ts', 'twelve', 'twenty', 'twice', 'two', 'u', 'un', 'under', 'underneath', 'undoing', 'unfortunately', 'unless', 'unlike', 'unlikely', 'until', 'unto', 'up', 'upon', 'ups', 'upwards', 'us', 'use', 'used', 'useful', 'usefully', 'usefulness', 'uses', 'using', 'usually', 'uucp', 'v', 'value', 'various', 've', 'versus', 'very', 'via', 'viz', 'vol', 'vols', 'vs', 'w', 'want', 'wants', 'was', 'wasn', "wasn't", 'way', 'we', "we'd", "we'll", "we're", "we've", 'wed', 'welcome', 'well', 'went', 'were', 'weren', "weren't", 'what', "what'll", "what's", "what've", 'whatever', 'whats', 'when', "when's", 'whence', 'whenever', 'where', "where's", 'whereafter', 'whereas', 'whereby', 'wherein', 'wheres', 'whereupon', 'wherever', 'whether', 'which', 'whichever', 'while', 'whilst', 'whim', 'whither', 'who', "who'd", "who'll", "who's", 'whod', 'whoever', 'whole', 'whom', 'whomever', 'whos', 'whose', 'why', "why's", 'widely', 'will', 'willing', 'wish', 'with', 'within', 'without', 'won', "won't", 'wonder', 'words', 'world', 'would', 'wouldn', "wouldn't", 'www', 'x', 'y', 'yes', 'yet', 'you', "you'd", "you'll", "you're", "you've", 'youd', 'your', 'youre', 'yours', 'yourself', 'yourselves', 'z', 'zero', '‘d', '‘ll', '‘m', '‘re', '‘s', '‘ve', '’d', '’ll', '’m', '’re', '’s', '’ve']
    for i in range(len(tokenized_list)):
      j = 0
      while j < len(tokenized_list[i]):
        if tokenized_list[i][j] in stopwords:
          tokenized_list[i].pop(j)
        else:
          j += 1
    return tokenized_list

  def preprocess_raw_data(text):
      text2 = re.sub(' +', ' ', text)
      text2 = text2.strip()
      og_sentences = text2.split('. ')
      special_chars = list((punctuation))
      special_chars.append('—')
      sentences = []
      for i in range(len(og_sentences)):
        sent = og_sentences[i].lower()
        for j in special_chars:
          sent = sent.replace(j,'')
        if len(sent) > 10:
          sentences.append(sent)
      return sentences

  """## Scoring"""

  # Neutral Sentence Scoring
  def classify_neutral(sentiment_text):
      score = SentimentIntensityAnalyzer().polarity_scores(sentiment_text)
      if score['neu'] > 0.7:
        return 1
      return 0

  def calculate_score(tokenized_list,sentence_list):
    neutral_scores_list = []
    for i in range(len(tokenized_list)):
      score = classify_neutral(''.join(tokenized_list[i]))
      neutral_scores_list.append( 0.075/len(sentence_list[i]) * score)
    return neutral_scores_list

  def neutral_sentence_score(tokenized_list, sentence_list):
    neutral_scores_list = calculate_score(tokenized_list,sentence_list)
    return neutral_scores_list

  # TF-IDF scoring
  import math

  def TF_IDF(textseg):
    # Counting the frequency of words in document
    frequency_score = {}
    total_length=0
    for i in textseg:
      for j in i:
        total_length+=1
        if j in frequency_score:
          frequency_score[j] += 1
        else:
          frequency_score[j] = 1

    # calculating the tf score
    tf_score={}
    for i in frequency_score:
      tf_score[i]=frequency_score[i]/total_length

    # as we are considering only one document we have to take df to be 1
    # idf=log(N/(df+1))
    idf=math.log(1/2,2.71828)

    # calculating the tf-idf score
    tfIdf_score={}
    for i in tf_score:
      tfIdf_score[i]=tf_score[i]*idf
    

    para=[]
    for i in textseg:
      sum1=0
      for j in i:
        try:
          sum1+=tfIdf_score[j]
        except:
          sum1+=0

      if len(i) != 0:
          para.append([sum1/len(i),i])
      else:
          para.append([0,i])

    ans=[]
    for i in para:
      ans.append(i[0])

    return ans

  def TFIDF_score(tokenized_list):
    tfidf_scores_list = TF_IDF(tokenized_list)
    return tfidf_scores_list

  import numpy as np
  import pandas as pd
  import nltk
  import re
  # from nltk.tokenize import sent_tokenize
  # from nltk.corpus import stopwords
  # from gensim.models import Word2Vec
  # from scipy import spatial
  # import networkx as nx

  
  import math
  import re
  from collections import Counter

  def page_rank(sentence_tokens):
    WORD = re.compile(r"\w+")

    def get_cosine(X,Y):
      X_set = set(X)
      Y_set = set(Y)
      l1 =[];l2 =[]
        
      rvector = X_set.union(Y_set) 
      for w in rvector:
          if w in X_set: l1.append(1) 
          else: l1.append(0)
          if w in Y_set: l2.append(1)
          else: l2.append(0)
      c = 0
        
      for i in range(len(rvector)):
              c+= l1[i]*l2[i]

      if float((sum(l1)*sum(l2))**0.5) != 0.0:
            cosine = c / float((sum(l1)*sum(l2))**0.5)
      else:
            cosine = 0

      return cosine

    def text_to_vector(text):
        words = WORD.findall(text)
        return Counter(words)
    
    # textseg = preprocessing(test1)
    textseg = sentence_tokens
    n = len(textseg)
    graph = []
    for i in range(n):
      ins = []
      text1_list = textseg[i]
      for j in range(n):
        text2_list = textseg[j]
        cosine = get_cosine(text1_list, text2_list)
        ins.append(cosine)
      graph.append(ins)

    graph2=[]
    limitOfCosine=0.2
    for i in graph:
      les = []
      for j in i:
        les.append(1 if j >= limitOfCosine and j!=1 else 0)
      graph2.append(les)

    def win(matrix, m, o):
      k = 0
      for i in range(0, n):
        if(int(matrix[i][m]) == 1):
          k = k+1
      l = 0
      for i in range(0, n):
        if(int(matrix[o][i] == 1)):
          for j in range(0, n):
            if(matrix[j][i] == 1):
              l = l+1
      return float(k/l)


    def wout(matrix, m, o):
      k = 0
      for i in range(0, n):
        if(int(matrix[0][i]) == 1):
          k = k+1
      l = 0
      for i in range(0, n):
        if(int(matrix[o][i] == 1)):
          for j in range(0, n):
            if(matrix[i][j] == 1):
              l = l+1
      return float(k/l)


    def pagerank(matrix, o, n, p):
      a = 0
      for i in range(0, n):
        if(int(matrix[i][o]) == 1):
          k = 0
          for s in range(0, n):
            if(matrix[i][s] == 1):
              k = k+1
          a = a+float((p[i]/k)*win(matrix, i, o)*wout(matrix, i, o))
      return a


    n = len(textseg)
    matrix = graph2
    d = 0.25 # damping factor

    o = 100 #Number of iterations
    p = []

    for i in range(0, n):
      p.append(1)
    for k in range(0, o):
      for u in range(0, n):
        g = pagerank(matrix, u, n, p)
        p[u] = (1-d)+d*g
    return p










  # def page_rank(sentence_tokens):
  #   #vectorization of sentences
  #   w2v = Word2Vec(sentence_tokens,size=1,min_count=1,iter=1000)

  #   #sentence embeddings using word embedding : The word embeddings produced using Word2Vec are such that the numerical vectors have cosine distance very low for similar words (like king & queen) but high cosine distance between unrelated words (like king & classroom)
  #   sentence_embeddings = [[w2v[word][0] for word in words] for words in sentence_tokens]
  #   max_len = max([len(tokens) for tokens in sentence_tokens])
  #   sentence_embeddings = [np.pad(embedding,(0,max_len-len(embedding)),'constant') for embedding in sentence_embeddings]

  #   #similarity between sentences using cosine similarity
  #   similarity_matrix = np.zeros([len(sentence_tokens), len(sentence_tokens)])
  #   for i,row_embedding in enumerate(sentence_embeddings):
  #     for j,column_embedding in enumerate(sentence_embeddings):
  #       similarity_matrix[i][j] = 1 - spatial.distance.cosine(row_embedding,column_embedding)

  #   # build graph with cosine similarity as weights
  #   nx_graph = nx.from_numpy_array(similarity_matrix)

  #   #get pagerank scores
  #   scores = nx.pagerank_numpy(nx_graph)
  #   return scores

  # !pip install yake

  import yake

  def generate_keywords(text):
    kw_extractor = yake.KeywordExtractor()
    language = "en"
    max_ngram_size = 3
    deduplication_threshold = 0.9
    numOfKeywords = 10
    custom_kw_extractor = yake.KeywordExtractor(lan=language, n=max_ngram_size, dedupLim=deduplication_threshold, top=numOfKeywords, features=None)
    keywords = custom_kw_extractor.extract_keywords(text)
    # for kw in keywords:
    #   print(kw)
    return keywords

  def keypharesscores(text1,textseg):
    keyphrases = generate_keywords(text1)
    scores=[]
    for i in range(0,len(textseg)):
      score=0
      for j in keyphrases:
        if j[0] in textseg[i]:
          score=score+1
      score=(score/len(keyphrases))*0.3
      scores.append(score)
    return scores

  # Normalizing score
  def Min_max(v,min1,max1,newmin,newmax):
      ans = ((v-min1) / (max1-min1)) * (newmax - newmin) + newmin
      return round(ans,3)
  def normalize(li):
    ans=[]
    for v in li:
      if min(li) == max(li):
        return li
      temp=Min_max(v,min(li),max(li),0,1)
      ans.append(temp)
    return ans

  def normalize_scores(scores_list):
    return [normalize(scores_list[0]), normalize(scores_list[1]), normalize(scores_list[2]), normalize(scores_list[3])]

  def overall_score(sentences, normalized_scores_list):
    overall_Score=[]
    dict1={}
    for i in range(0,len(normalized_scores_list[0])):
      ans=normalized_scores_list[0][i]+normalized_scores_list[1][i]+normalized_scores_list[2][i]+normalized_scores_list[3][i]
      ans=round(ans,6)
      dict1[sentences[i]]=[ans,i]
      overall_Score.append(ans)
    return dict1

  def get_summary(dict1):

    total=len(dict1)
    summaryLength=math.ceil((40*total)/100)

    # dict1 = sorted(dict1, key=lambda x: x[0],reverse=True)
    dict1 = (sorted(dict1.items(), key =
              lambda kv:(kv[1], kv[0]), reverse= True))
    dict2=[]
    for i in dict1:
      x=i[0].split(" ")
      if(len(x)<=3):
        continue
      else:
        dict2.append(i)
        if(len(dict2)>summaryLength):
          break
    
    opd1 = (sorted(dict2, key =lambda kv:kv[1][1]))
    summary=""
    for i in opd1:
      summary+=i[0].capitalize()+". "
    return summary

  def preprocess_data(raw_text):
    sentence_list = preprocess_raw_data(raw_text)
    tokenized_list = tokenize_sentence(sentence_list)
    tokenized_list = remove_stopwords(tokenized_list)
    return [tokenized_list, sentence_list]

  def score_sentences(raw_text, tokenized_list, sentence_list):
    neutral_score_list = neutral_sentence_score(tokenized_list, sentence_list)
    tfidf_score_list = TFIDF_score(tokenized_list)
    pageRank_score_list = page_rank(tokenized_list)
    keyphrases_score_list = keypharesscores(raw_text,tokenized_list)

    return [neutral_score_list, tfidf_score_list, pageRank_score_list, keyphrases_score_list]


  def generate_summary(raw_text):
    # Step 1: Pre-processing
    tokenized_list = preprocess_data(raw_text)[0]
    sentence_list = preprocess_data(raw_text)[1]

    # Step 2: Scoring of sentences
    scores_list = score_sentences(raw_text, tokenized_list, sentence_list)

    # Step 3: Normalize scores
    normalized_scores_list = normalize_scores(scores_list)

    # Step 4: Calculating overall score
    sentences_scores = overall_score(sentence_list, normalized_scores_list)

    # Step 5: Sorting the dictionary and taking 40% and generating summary
    # final_summary = get_summary(sentences_scores)

    # return final_summary
    return get_summary(sentences_scores)


  summarized_dict = {}
  for i in paper_content:
    print("##########################################################")
    summarized_dict[i] = generate_summary(str(paper_content[i]))
   
  print(summarized_dict) 
  return summarized_dict


