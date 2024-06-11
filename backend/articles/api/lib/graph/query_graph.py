from rdflib.plugins.sparql import prepareQuery

def query_graph(g):
    query = prepareQuery("""
    SELECT ?subject ?predicate ?object
    WHERE {
        ?subject ?predicate ?object.
    }
    """)
    for row in g.query(query):
        print(f"{row.subject} {row.predicate} {row.object}")

    return query
