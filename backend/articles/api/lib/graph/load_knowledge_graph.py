import os
from rdflib import Graph
from django.conf import settings
from .knowledge_graph import create_knowledge_graph
from owlrl import DeductiveClosure, OWLRL_Semantics

def load_knowledge_graph(file_path='knowledge_graph.ttl'):
    path = os.path.join(settings.BASE_DIR, 'graph', file_path)

    g = Graph()

    if os.path.exists(path):
        g.parse(path, format='turtle')
    else:
        g = create_knowledge_graph()

    # Perform OWL RL reasoning
    DeductiveClosure(OWLRL_Semantics).expand(g)

    return g
